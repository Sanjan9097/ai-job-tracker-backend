import { getFilteredJobs } from '../services/jobService.js';

export default async function jobRoutes(app) {

    app.get('/jobs', async (req) => {
        const filters = req.query;
        return getFilteredJobs(filters);
    });

}

