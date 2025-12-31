// In-memory data store
// This replaces the local variables in controllers for a shared state

export const users = new Map();
export const institutions = new Map();
export const research = new Map();

// Seed initial data for Institutions (Malaysia)
const initialInstitutions = [
  {
    id: 'inst_1',
    name: 'UniKL MIIT',
    location: { lat: 3.1579, lng: 101.7116, address: '1016, Jalan Sultan Ismail, 50250 Kuala Lumpur' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/UniKL_Logo.svg/1200px-UniKL_Logo.svg.png',
    totalUploads: 120,
    averageRating: 4.5,
    country: 'Malaysia'
  },
  {
    id: 'inst_2',
    name: 'Universiti Malaya (UM)',
    location: { lat: 3.1209, lng: 101.6538, address: 'Jalan Universiti, 50603 Kuala Lumpur' },
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Universiti_Malaya_coat_of_arms.svg/1200px-Universiti_Malaya_coat_of_arms.svg.png',
    totalUploads: 350,
    averageRating: 4.8,
    country: 'Malaysia'
  },
  {
    id: 'inst_3',
    name: 'Universiti Teknologi Malaysia (UTM)',
    location: { lat: 1.5600, lng: 103.6300, address: 'Jalan Sultan Yahya Petra, 54100 Kuala Lumpur' }, // KL Campus
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Universiti_Teknologi_Malaysia_Logo.svg/1200px-Universiti_Teknologi_Malaysia_Logo.svg.png',
    totalUploads: 200,
    averageRating: 4.6,
    country: 'Malaysia'
  }
];

initialInstitutions.forEach(inst => institutions.set(inst.id, inst));

// Seed initial data for Research
const initialResearch = [
  {
    id: 'res_1',
    title: 'AI in Healthcare',
    institutionId: 'inst_1',
    authorId: 'user_1', // Placeholder
    degree: 'Bachelor',
    course: 'Information Technology',
    subjectCode: 'BIT3012',
    yearSubmission: 2024,
    yearPublication: 2024,
    abstract: 'A study on the impact of AI in modern healthcare systems.',
    keywords: ['AI', 'Healthcare', 'Machine Learning'],
    grade: 'A',
    starRating: 3,
    price: 0, // Free
    downloads: 10,
    earnings: 0
  }
];

initialResearch.forEach(res => research.set(res.id, res));
