import { getFilteredJobs } from '../services/jobService.js';
import { getResume } from '../services/resumeService.js';
import { matchJob } from '../ai/langchain/jobMatcher.js';

export default async function aiRoutes(app) {

    app.get('/jobs/match', async (req) => {
        const resume = getResume('test@gmail.com');
        const jobs = getFilteredJobs(req.query);

        const results = [];

        for (const job of jobs) {
            const match = await matchJob(resume, job);
            results.push({
                ...job,
                matchScore: match.matchScore,
                matchingSkills: match.matchingSkills,
                reason: match.reason
            });
        }

        return results;
    });

}
