import { supabase } from '../config/supabaseClient.js';

export async function listSchemes(req, res, next) {
  try {
    const { data, error } = await supabase.from('schemes').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ schemes: data });
  } catch (error) {
    next(error);
  }
}

export async function createScheme(req, res, next) {
  try {
    const payload = {
      ...req.body,
      eligibility_rules: parsePossibleJson(req.body.eligibility_rules),
      required_documents: parseDocumentList(req.body.required_documents),
      created_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('schemes').insert(payload);
    if (error) throw error;
    res.json({ message: 'Scheme created' });
  } catch (error) {
    next(error);
  }
}

export async function editScheme(req, res, next) {
  try {
    const { id } = req.params;
    const payload = {
      ...req.body,
      eligibility_rules: parsePossibleJson(req.body.eligibility_rules),
      required_documents: parseDocumentList(req.body.required_documents),
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('schemes').update(payload).eq('id', id);
    if (error) throw error;
    res.json({ message: 'Scheme updated' });
  } catch (error) {
    next(error);
  }
}

export async function removeScheme(req, res, next) {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('schemes').delete().eq('id', id);
    if (error) throw error;
    res.json({ message: 'Scheme removed' });
  } catch (error) {
    next(error);
  }
}

function parsePossibleJson(raw) {
  if (!raw) return {};
  try {
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    return { raw: raw.toString() };
  }
}

function parseDocumentList(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return raw.split(',').map((item) => item.trim()).filter(Boolean);
}
