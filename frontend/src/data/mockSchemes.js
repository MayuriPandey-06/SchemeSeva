export const mockSchemes = [
  {
    id: 'mock-1',
    name: 'Unified Citizen Support Plan',
    description: 'Financial support for low-income households, including subsidized utilities and education vouchers.',
    benefits: 'Cash support, food subsidy, school supplies, and essential services access.',
    required_documents: 'Aadhaar card, income proof, residential proof',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
    confidence: 92,
    eligibility_rules: { min_income: 300000, education_levels: ['High School', 'Graduate'], states: ['Delhi', 'Maharashtra'] }
  },
  {
    id: 'mock-2',
    name: 'Rural Farmer Income Guarantee',
    description: 'Support for farmers to stabilize income during planting and harvest seasons.',
    benefits: 'Seasonal cash grants, crop insurance subsidies, and technical assistance.',
    required_documents: 'Aadhaar card, landholding documents, farmer ID',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    confidence: 88,
    eligibility_rules: { farmer_required: true, states: ['Punjab', 'Haryana', 'Uttar Pradesh'] }
  },
  {
    id: 'mock-3',
    name: 'Youth Education Uplift Scheme',
    description: 'Scholarship program for students pursuing higher education and vocational training.',
    benefits: 'Tuition waiver, mentorship, and internship placement support.',
    required_documents: 'Aadhaar card, education certificates, income proof',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    confidence: 84,
    eligibility_rules: { education_levels: ['Graduate'], occupations: ['Student'], min_income: 450000 }
  },
  {
    id: 'mock-4',
    name: 'Senior Health & Pension Support',
    description: 'Monthly pension and medical assistance for senior citizens.',
    benefits: 'Pension allowance, health checkups, and medicine support.',
    required_documents: 'Aadhaar card, age proof, medical certificate',
    deadline: null,
    confidence: 78,
    eligibility_rules: { min_age: 60, max_income: 500000 }
  },
  {
    id: 'mock-5',
    name: 'Women Empowerment Startup Fund',
    description: 'Seed capital and training for women entrepreneurs starting micro-businesses.',
    benefits: 'Seed funding, business training, and market access support.',
    required_documents: 'Aadhaar card, business plan, self-declaration',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
    confidence: 82,
    eligibility_rules: { gender: 'Female', occupations: ['Entrepreneur', 'Unemployed'] }
  },
  {
    id: 'mock-6',
    name: 'National Solar Rooftop Subsidy',
    description: 'Financial assistance for residential consumers to install solar panels on their roofs.',
    benefits: '30% to 40% subsidy on installation costs and reduced electricity bills.',
    required_documents: 'Aadhaar card, electricity bill, property ownership proof',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120).toISOString(),
    confidence: 75,
    eligibility_rules: { states: ['Gujarat', 'Rajasthan', 'Karnataka'], min_income: 1000000 }
  },
  {
    id: 'mock-7',
    name: 'Atmanirbhar Skilled Employee Pro',
    description: 'Placement and training support for skilled workers across various industrial sectors.',
    benefits: 'Skill certification, job placement assistance, and stipend during training.',
    required_documents: 'Aadhaar card, vocational certificate, bank details',
    deadline: null,
    confidence: 89,
    eligibility_rules: { education_levels: ['Vocational', 'Graduate'], occupations: ['Worker', 'Unemployed'] }
  },
  {
    id: 'mock-8',
    name: 'Digital Literacy for All',
    description: 'Free digital training for rural citizens to help them navigate online government services.',
    benefits: 'Free 20-hour training course, certificate, and digital kit.',
    required_documents: 'Aadhaar card',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
    confidence: 95,
    eligibility_rules: { states: ['All'] }
  },
  {
    id: 'mock-9',
    name: 'Clean Water Rural Initiative',
    description: 'Support for households in water-scarce areas to install rainwater harvesting systems.',
    benefits: 'Technical design support and 50% subsidy on material costs.',
    required_documents: 'Aadhaar card, residential proof, site photo',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    confidence: 68,
    eligibility_rules: { states: ['Rajasthan', 'Tamil Nadu', 'Andhra Pradesh'] }
  },
  {
    id: 'mock-10',
    name: 'MSME Growth Accelerator',
    description: 'Collateral-free loans and marketing support for small manufacturing units.',
    benefits: 'Loans up to ₹10 Lakhs, interest subvention, and trade fair participation.',
    required_documents: 'Udyam registration, business PAN, bank statement',
    deadline: null,
    confidence: 72,
    eligibility_rules: { occupations: ['Business Owner', 'Entrepreneur'] }
  },
  {
    id: 'mock-11',
    name: 'Integrated Child Development Services (ICDS)',
    description: 'Providing food, preschool education, and primary healthcare to children and their mothers.',
    benefits: 'Supplementary nutrition, immunization, and health check-ups for children under 6.',
    required_documents: 'Aadhaar card, birth certificate',
    deadline: null,
    confidence: 81,
    eligibility_rules: { max_age: 6 }
  },
  {
    id: 'mock-12',
    name: 'National Social Assistance Programme',
    description: 'Financial assistance to elderly, widows and persons with disabilities from BPL households.',
    benefits: 'Monthly pension ranging from ₹300 to ₹500.',
    required_documents: 'Aadhaar card, BPL certificate, age proof',
    deadline: null,
    confidence: 85,
    eligibility_rules: { disability_required: true, max_income: 120000 }
  },
  {
    id: 'mock-13',
    name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
    description: 'Placement linked skill development program for rural poor youth.',
    benefits: 'Skill training, certificate, and guaranteed placement in formal sector jobs.',
    required_documents: 'Aadhaar card, education certificate, residence proof',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString(),
    confidence: 77,
    eligibility_rules: { max_age: 35, education_levels: ['High School'] }
  },
  {
    id: 'mock-14',
    name: 'Pradhan Mantri Awas Yojana (Urban)',
    description: 'Interest subsidy on home loans for low-income groups in urban areas.',
    benefits: 'Up to 6.5% interest subsidy on housing loans.',
    required_documents: 'Aadhaar card, income certificate, property documents',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
    confidence: 65,
    eligibility_rules: { max_income: 600000, states: ['All Urban'] }
  },
  {
    id: 'mock-15',
    name: 'Smart City Citizen Grant',
    description: 'Innovation grants for citizens proposing sustainable solutions for urban living.',
    benefits: 'Grants up to ₹5 Lakhs for pilot projects in smart cities.',
    required_documents: 'Aadhaar card, project proposal, address proof',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
    confidence: 70,
    eligibility_rules: { states: ['Indore', 'Surat', 'Bhopal'] }
  },
];
