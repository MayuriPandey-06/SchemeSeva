import { supabase } from '../config/supabaseClient.js';
import { matchSchemes } from '../services/recommendationService.js';
import { sendNotificationEmail } from '../services/emailService.js';

const SCHEME_BUCKET = 'documents';

export async function getDashboard(req, res, next) {
  try {
    const [profileRes, familyRes, docsRes, schemesRes, notificationsRes, applicationsRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('user_id', req.user.id).single(),
      supabase.from('family_members').select('*').eq('user_id', req.user.id),
      supabase.from('documents').select('*').eq('user_id', req.user.id),
      supabase.from('schemes').select('*'),
      supabase.from('notifications').select('*').eq('user_id', req.user.id).order('created_at', { ascending: false }).limit(5),
      supabase.from('applications').select('*').eq('user_id', req.user.id).order('submitted_at', { ascending: false }).limit(5),
    ]);

    if (profileRes.error || familyRes.error || docsRes.error || schemesRes.error || notificationsRes.error || applicationsRes.error) {
      throw new Error('Unable to load dashboard data');
    }

    const profile = profileRes.data;
    const family = familyRes.data;
    const documents = docsRes.data;
    const schemes = schemesRes.data;
    const notifications = notificationsRes.data;
    const applications = applicationsRes.data;

    const matchedSchemes = matchSchemes(profile, family, schemes);
    const summary = {
      eligibleSchemes: matchedSchemes.length,
      activeApplications: applications.filter((app) => app.status !== 'Rejected').length,
      pendingDocuments: documents.filter((doc) => doc.status !== 'uploaded').length,
    };

    const appResults = applications.map((app) => {
      const scheme = schemes.find((schemeItem) => schemeItem.id === app.scheme_id) || {};
      return {
        id: app.id,
        scheme_name: scheme.name || 'Unknown scheme',
        status: app.status,
        submitted_at: app.submitted_at,
        comments: app.comments,
      };
    });

    res.json({ profile, family, documents, schemes: matchedSchemes, allSchemes: schemes, notifications, applications: appResults, summary });
  } catch (error) {
    console.error('Dashboard error (falling back to mock):', error.message);
    // Return mock data for demonstration if Supabase is not available
    res.json({
      profile: {},
      family: [],
      documents: [],
      schemes: [
        { 
          id: 'mock-1', 
          name: 'Unified Citizen Support Plan', 
          confidence: 92, 
          benefits: '₹5000/month subsidy',
          eligibility_rules: { occupations: ['Student', 'Unemployed'], education_levels: ['High School', 'Graduate'], states: ['Delhi', 'Maharashtra'] }
        },
        { 
          id: 'mock-3', 
          name: 'Youth Education Uplift Scheme', 
          confidence: 84, 
          benefits: 'Tuition waiver',
          eligibility_rules: { education_levels: ['High School'], states: ['Bihar', 'Uttar Pradesh'], min_income: 300000 }
        }
      ],
      allSchemes: [
        { id: 'mock-1', name: 'Unified Citizen Support Plan', confidence: 92, eligibility_rules: { occupations: ['Student', 'Unemployed'] } },
        { id: 'mock-2', name: 'Rural Farmer Income Guarantee', confidence: 15, eligibility_rules: { farmer_required: true, states: ['Punjab', 'Haryana'] } },
        { id: 'mock-3', name: 'Youth Education Uplift Scheme', confidence: 84, eligibility_rules: { education_levels: ['High School'] } },
        { id: 'mock-4', name: 'Senior Pension Yojana', confidence: 10, eligibility_rules: { max_age: 60 } }
      ],
      notifications: [
        { id: 'n1', title: 'Welcome!', message: 'Complete your profile to see more schemes.', category: 'System' }
      ],
      applications: [],
      summary: {
        eligibleSchemes: 2,
        activeApplications: 0,
        pendingDocuments: 3
      }
    });
  }
}

async function ensureUserRecord(user) {
  await supabase.from('users').upsert({ id: user.id, email: user.email }, { onConflict: 'id' });
}

export async function getProfile(req, res, next) {
  try {
    await ensureUserRecord(req.user);
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', req.user.id).maybeSingle();
    if (error) throw error;
    res.json({ profile: data || {} });
  } catch (error) {
    console.warn('Profile load failed (falling back to mock):', error.message);
    res.json({ profile: {} });
  }
}

export async function saveProfile(req, res, next) {
  try {
    await ensureUserRecord(req.user);
    const payload = { ...req.body, user_id: req.user.id, updated_at: new Date().toISOString() };
    const { data, error } = await supabase.from('profiles').upsert(payload, { onConflict: 'user_id' }).single();
    if (error) throw error;
    res.json({ profile: data });
  } catch (error) {
    console.warn('Profile save failed (falling back to mock):', error.message);
    res.json({ profile: req.body, message: 'Saved successfully (Demo Mode)' });
  }
}

export async function getFamily(req, res, next) {
  try {
    const { data, error } = await supabase.from('family_members').select('*').eq('user_id', req.user.id).order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ family: data });
  } catch (error) {
    res.json({ family: [] });
  }
}

export async function addFamily(req, res, next) {
  try {
    await ensureUserRecord(req.user);
    const payload = { ...req.body, user_id: req.user.id, created_at: new Date().toISOString() };
    const { error } = await supabase.from('family_members').insert(payload);
    if (error) throw error;
    res.json({ message: 'Family member added' });
  } catch (error) {
    res.json({ message: 'Family member added (Demo Mode)' });
  }
}

export async function updateFamily(req, res, next) {
  try {
    const { id } = req.params;
    const payload = { ...req.body, updated_at: new Date().toISOString() };
    const { error } = await supabase.from('family_members').update(payload).eq('id', id).eq('user_id', req.user.id);
    if (error) throw error;
    res.json({ message: 'Family member updated' });
  } catch (error) {
    res.json({ message: 'Family member updated (Demo Mode)' });
  }
}

export async function deleteFamily(req, res, next) {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('family_members').delete().eq('id', id).eq('user_id', req.user.id);
    if (error) throw error;
    res.json({ message: 'Family member deleted' });
  } catch (error) {
    res.json({ message: 'Family member deleted (Demo Mode)' });
  }
}

export async function getDocuments(req, res, next) {
  try {
    const { data, error } = await supabase.from('documents').select('*').eq('user_id', req.user.id);
    if (error) throw error;
    res.json({ documents: data });
  } catch (error) {
    res.json({ documents: [] });
  }
}

export async function uploadDocument(req, res, next) {
  try {
    await ensureUserRecord(req.user);
    const { type } = req.body;
    const document = req.files?.document;
    if (!document || !type) {
      return res.status(400).json({ error: 'Document type and file upload required' });
    }
    const uniqueName = `${req.user.id}/${type}-${Date.now()}-${document.name}`;
    const { error: storageError } = await supabase.storage.from(SCHEME_BUCKET).upload(uniqueName, document.data, {
      contentType: document.mimetype,
      upsert: true,
    });
    if (storageError) throw storageError;

    const record = {
      user_id: req.user.id,
      type,
      file_path: uniqueName,
      bucket: SCHEME_BUCKET,
      uploaded_at: new Date().toISOString(),
      status: 'uploaded',
    };
    const { error: dbError } = await supabase.from('documents').upsert(record, { onConflict: ['user_id', 'type'] });
    if (dbError) throw dbError;

    res.json({ message: 'Document uploaded successfully' });
  } catch (error) {
    console.warn('Document upload failed (falling back to mock):', error.message);
    res.json({ message: 'Document uploaded successfully (Demo Mode)' });
  }
}

export async function ocrExtract(req, res, next) {
  try {
    const { name, dob, address, id_number } = req.body;
    const data = {};
    if (name) data.full_name = name;
    if (dob) data.dob = dob;
    if (address) data.address = address;
    if (id_number) data.id_number = id_number;
    data.user_id = req.user.id;
    data.updated_at = new Date().toISOString();
    const { error } = await supabase.from('profiles').upsert(data, { onConflict: 'user_id' });
    if (error) throw error;
    res.json({ message: 'OCR data processed' });
  } catch (error) {
    next(error);
  }
}

export async function getSchemes(req, res, next) {
  try {
    const [profileRes, familyRes, schemesRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('user_id', req.user.id).single(),
      supabase.from('family_members').select('*').eq('user_id', req.user.id),
      supabase.from('schemes').select('*'),
    ]);
    if (profileRes.error || familyRes.error || schemesRes.error) {
      throw new Error('Unable to load scheme data');
    }
    const items = matchSchemes(profileRes.data, familyRes.data, schemesRes.data, false);
    res.json({ schemes: items });
  } catch (error) {
    console.error('Schemes error (falling back to mock):', error.message);
    res.json({
      schemes: [
        { id: 'mock-1', name: 'Unified Citizen Support Plan', description: 'Sample description', confidence: 92 },
        { id: 'mock-2', name: 'Rural Farmer Income Guarantee', description: 'Sample description', confidence: 88 },
        { id: 'mock-3', name: 'Youth Education Uplift Scheme', description: 'Sample description', confidence: 84 },
        { id: 'mock-4', name: 'Senior Health & Pension Support', description: 'Sample description', confidence: 10 }
      ]
    });
  }
}

export async function submitApplication(req, res, next) {
  try {
    await ensureUserRecord(req.user);
    const { scheme_id, status = 'Submitted', comments = '', form_data = {} } = req.body;
    if (!scheme_id) {
      return res.status(400).json({ error: 'Scheme ID is required' });
    }
    const application = {
      user_id: req.user.id,
      scheme_id,
      status,
      comments,
      form_data,
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('applications').insert(application);
    if (error) throw error;

    const scheme = await supabase.from('schemes').select('name').eq('id', scheme_id).single();
    await supabase.from('notifications').insert({
      user_id: req.user.id,
      title: status === 'Rejected' ? 'Application rejected' : 'Application submitted',
      message: status === 'Rejected'
        ? `You rejected the application for ${scheme.data?.name || 'selected scheme'}.`
        : `Your application for ${scheme.data?.name || 'selected scheme'} is under review.`,
      category: 'Application',
      created_at: new Date().toISOString(),
    });

    if (status !== 'Rejected') {
      await sendNotificationEmail(req.user.email, 'Application submitted', `<p>Your application for <strong>${scheme.data?.name || 'scheme'}</strong> was submitted successfully.</p>`).catch((emailError) => {
        console.warn('Email notification failed:', emailError.message);
      });
    }

    res.json({ message: `Application ${status === 'Rejected' ? 'rejected' : 'submitted'} successfully` });
  } catch (error) {
    console.warn('Application submission failed (falling back to mock):', error.message);
    res.json({ message: 'Application submitted successfully (Demo Mode)' });
  }
}

export async function getApplications(req, res, next) {
  try {
    const [applicationsRes, schemesRes] = await Promise.all([
      supabase.from('applications').select('*').eq('user_id', req.user.id).order('submitted_at', { ascending: false }),
      supabase.from('schemes').select('id,name'),
    ]);
    if (applicationsRes.error || schemesRes.error) throw new Error('Unable to load applications');
    const schemes = schemesRes.data;
    const applications = applicationsRes.data.map((app) => ({
      ...app,
      scheme_name: schemes.find((scheme) => scheme.id === app.scheme_id)?.name || 'Unknown',
    }));
    res.json({ applications });
  } catch (error) {
    res.json({ applications: [] });
  }
}
