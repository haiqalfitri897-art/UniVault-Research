import { research } from '../data/store.js';

// Helper to calculate stars based on grade
const calculateStars = (grade) => {
  if (!grade) return 1;
  const g = grade.toUpperCase().replace(/\s/g, '');
  if (['A+', 'A', 'A-'].includes(g)) return 3;
  if (['B+', 'B', 'B-'].includes(g)) return 2;
  return 1;
};

export const getAllResearch = (req, res) => {
  try {
    const { degree, course, subjectCode, minRating, maxPrice, institutionId } = req.query;
    
    let results = Array.from(research.values());

    // Apply filters
    if (degree) {
      results = results.filter(r => r.degree === degree);
    }
    if (course) {
      results = results.filter(r => r.course && r.course.toLowerCase().includes(course.toLowerCase()));
    }
    if (subjectCode) {
      results = results.filter(r => r.subjectCode === subjectCode);
    }
    if (minRating) {
      results = results.filter(r => r.starRating >= parseInt(minRating));
    }
    if (maxPrice) {
      results = results.filter(r => r.price <= parseFloat(maxPrice));
    }
    if (institutionId) {
      results = results.filter(r => r.institutionId === institutionId);
    }

    res.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch research' });
  }
};

export const createResearch = (req, res) => {
  try {
    const { 
      title, 
      institutionId, 
      degree, 
      course, 
      subjectCode, 
      yearSubmission, 
      yearPublication, 
      abstract, 
      keywords, 
      grade, 
      price 
    } = req.body;

    if (!title || !grade) {
      return res.status(400).json({ error: 'Title and Grade are required' });
    }

    const researchId = `res_${Date.now()}`;
    const starRating = calculateStars(grade);

    const newResearch = {
      id: researchId,
      userId: req.userId, // From auth middleware
      institutionId,
      title,
      degree,
      course,
      subjectCode,
      yearSubmission,
      yearPublication,
      abstract,
      keywords: Array.isArray(keywords) ? keywords : [],
      grade,
      starRating,
      price: parseFloat(price) || 0,
      downloads: 0,
      earnings: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    research.set(researchId, newResearch);

    res.status(201).json({
      success: true,
      message: 'Research created successfully',
      data: newResearch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create research' });
  }
};

export const getResearchById = (req, res) => {
  try {
    const { id } = req.params;
    const item = research.get(id);

    if (!item) {
      return res.status(404).json({ error: 'Research not found' });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch research' });
  }
};

export const updateResearch = (req, res) => {
  try {
    const { id } = req.params;
    const item = research.get(id);

    if (!item) {
      return res.status(404).json({ error: 'Research not found' });
    }

    if (item.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updates = req.body;
    Object.assign(item, updates);
    item.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Research updated successfully',
      data: item,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update research' });
  }
};

export const deleteResearch = (req, res) => {
  try {
    const { id } = req.params;
    const item = research.get(id);

    if (!item) {
      return res.status(404).json({ error: 'Research not found' });
    }

    if (item.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    research.delete(id);

    res.json({
      success: true,
      message: 'Research deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete research' });
  }
};
