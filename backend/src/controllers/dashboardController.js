// Mock dashboard data
const dashboardData = {
  stats: {
    totalProjects: 12,
    activeResearch: 5,
    publications: 3,
    collaborators: 8,
  },
  recentActivity: [
    { id: 1, type: 'upload', title: 'New paper uploaded', date: new Date() },
    { id: 2, type: 'collaboration', title: 'Invited to project X', date: new Date(Date.now() - 86400000) },
    { id: 3, type: 'milestone', title: 'Milestone completed', date: new Date(Date.now() - 172800000) },
  ],
  projects: [
    { id: 1, name: 'Project Alpha', status: 'active', progress: 75 },
    { id: 2, name: 'Project Beta', status: 'active', progress: 50 },
    { id: 3, name: 'Project Gamma', status: 'completed', progress: 100 },
  ],
};

export const getDashboard = (req, res) => {
  try {
    res.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

export const getStats = (req, res) => {
  try {
    res.json({
      success: true,
      data: dashboardData.stats,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const getActivity = (req, res) => {
  try {
    res.json({
      success: true,
      data: dashboardData.recentActivity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
};
