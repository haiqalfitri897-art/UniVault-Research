import { institutions } from '../data/store.js';

export const getAllInstitutions = (req, res) => {
  try {
    const allInstitutions = Array.from(institutions.values());
    res.json(allInstitutions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch institutions' });
  }
};

export const getInstitutionById = (req, res) => {
  try {
    const { id } = req.params;
    const institution = institutions.get(id);

    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    res.json(institution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch institution' });
  }
};
