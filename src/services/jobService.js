import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/jobs.json');

function daysBetween(date) {
    const diff = Date.now() - new Date(date).getTime();
    return diff / (1000 * 60 * 60 * 24);
}

export function getFilteredJobs(filters = {}) {
    const data = fs.readFileSync(filePath, 'utf-8');
    let jobs = JSON.parse(data);

    const {
        title,
        skills,
        jobType,
        workMode,
        location,
        datePosted
    } = filters;

    // Title filter
    if (title) {
        jobs = jobs.filter(j =>
            j.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    // Skills filter (comma separated)
    if (skills) {
        const skillList = skills.split(',').map(s => s.toLowerCase());
        jobs = jobs.filter(j =>
            skillList.every(skill =>
                j.skills.map(s => s.toLowerCase()).includes(skill)
            )
        );
    }

    // Job type
    if (jobType) {
        jobs = jobs.filter(j => j.jobType === jobType);
    }

    // Work mode
    if (workMode) {
        jobs = jobs.filter(j => j.workMode === workMode);
    }

    // Location
    if (location) {
        jobs = jobs.filter(j =>
            j.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    // Date posted
    if (datePosted) {
        jobs = jobs.filter(j => {
            const days = daysBetween(j.postedDate);
            if (datePosted === 'last24h') return days <= 1;
            if (datePosted === 'lastWeek') return days <= 7;
            if (datePosted === 'lastMonth') return days <= 30;
            return true;
        });
    }

    return jobs;
}


