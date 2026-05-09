const APPLICATIONS_STORAGE_KEY = 'gov-scheme-applications';

export const PROFILE_STORAGE_KEY = 'gov-scheme-profile';

const requiredFields = [
  'full_name', 'dob', 'gender', 'address', 'state', 'district', 'phone', 'occupation', 'annual_income', 'caste_category', 'disability_status', 'education_level', 'farmer_status'
];

export function isProfileComplete(profile) {
  if (!profile) return false;
  return requiredFields.every(field => profile[field] && profile[field].toString().trim() !== '');
}

export function loadLocalApplications() {
  try {
    return JSON.parse(localStorage.getItem(APPLICATIONS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function mergeApplications(serverApps, localApps) {
  const merged = [...serverApps];
  localApps.forEach((local) => {
    if (!merged.find((app) => app.scheme_id === local.scheme_id)) {
      merged.push(local);
    }
  });
  return merged;
}
