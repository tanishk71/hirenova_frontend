import API from './api';

const jobApi = {
  // Search jobs with filters
  searchJobs: async (params) => {
    try {
      const response = await API.get('/jobs/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  }
};

export default jobApi;