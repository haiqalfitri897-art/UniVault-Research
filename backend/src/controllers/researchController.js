// In-memory research database (replace with real database in production)
const researchData = new Map();
let researchIdCounter = 1;

export const getAllResearch = (req, res) => {
  try {
    const userResearch = Array.from(researchData.values()).filter(
      (research) => research.userId === req.userId
    );

    res.json({
      success: true,
      data: userResearch,
      count: userResearch.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch research' });
  }
};

export const createResearch = (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const researchId = researchIdCounter++;
    const newResearch = {
      id: researchId,
      userId: req.userId,
      title,
      description: description || '',
      status: status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    researchData.set(researchId, newResearch);

    res.status(201).json({
      success: true,
      message: 'Research created successfully',
      data: newResearch,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create research' });
  }
};

export const getResearchById = (req, res) => {
  try {
    const { id } = req.params;
    const research = researchData.get(parseInt(id));

    if (!research) {
      return res.status(404).json({ error: 'Research not found' });
    }

    if (research.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({
      success: true,
      data: research,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch research' });
  }
};

export const updateResearch = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const research = researchData.get(parseInt(id));

    if (!research) {
      return res.status(404).json({ error: 'Research not found' });
    }

    if (research.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (title) research.title = title;
    if (description) research.description = description;
    if (status) research.status = status;
    research.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Research updated successfully',
      data: research,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update research' });
  }
};

export const deleteResearch = (req, res) => {
  try {
    const { id } = req.params;
    const research = researchData.get(parseInt(id));

    if (!research) {
      return res.status(404).json({ error: 'Research not found' });
    }

    if (research.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    researchData.delete(parseInt(id));

    res.json({
      success: true,
      message: 'Research deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete research' });
  }
};
