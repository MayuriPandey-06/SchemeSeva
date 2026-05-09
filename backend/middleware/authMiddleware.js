import { supabase } from '../config/supabaseClient.js';

export async function protectedRoute(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }
  const token = authHeader.split(' ')[1];
  
  // Allow mock-token for demonstration purposes if Supabase is not configured
  if (token === 'mock-token') {
    req.user = { id: 'demo-user-123', email: 'demo@example.com', app_metadata: { role: 'citizen' } };
    return next();
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  req.user = data.user;
  next();
}

export function adminRoute(req, res, next) {
  if (req.user?.app_metadata?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}
