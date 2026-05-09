export function matchSchemes(profile, familyMembers, schemes, applyFilter = true) {
  if (!profile) return [];
  const results = schemes.map((scheme) => {
    const eligible = evaluateEligibility(profile, familyMembers, scheme.eligibility_rules);
    return {
      ...scheme,
      confidence: Math.min(100, Math.max(0, Math.round(eligible.score * 100))),
      required_documents: Array.isArray(scheme.required_documents) ? scheme.required_documents.join(', ') : scheme.required_documents,
    };
  });

  const sorted = results.sort((a, b) => b.confidence - a.confidence);
  return applyFilter ? sorted.filter((scheme) => scheme.confidence >= 40) : sorted;
}

function evaluateEligibility(profile, familyMembers, rules) {
  let score = 0;
  let matches = 0;
  if (!rules) return { score: 0, matches: 0 };
  const conditions = [];

  if (rules.states?.length) conditions.push(rules.states.includes(profile.state));
  if (rules.occupations?.length) conditions.push(rules.occupations.includes(profile.occupation));
  if (rules.education_levels?.length) conditions.push(rules.education_levels.includes(profile.education_level));
  if (rules.farmer_required !== undefined) conditions.push(profile.farmer_status === (rules.farmer_required ? 'Yes' : 'No'));
  if (rules.caste_categories?.length) conditions.push(rules.caste_categories.includes(profile.caste_category));
  if (rules.disability_required) conditions.push(profile.disability_status !== 'None');
  if (rules.min_income !== undefined) conditions.push(Number(profile.annual_income) <= Number(rules.min_income));
  if (rules.max_age !== undefined) {
    const age = getAge(profile.dob);
    conditions.push(age <= rules.max_age);
  }
  if (rules.gender) conditions.push(profile.gender === rules.gender);

  conditions.forEach((condition) => {
    if (condition) matches += 1; else score -= 0.15;
  });

  score += Math.max(0, matches / Math.max(1, conditions.length));

  if (rules.family_support && Array.isArray(familyMembers) && familyMembers.length) {
    score += 0.1;
  }

  return { score, matches };
}

function getAge(dob) {
  if (!dob) return 0;
  const date = new Date(dob);
  const diff = Date.now() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}
