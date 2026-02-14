import { StateGraph } from "@langchain/langgraph";

// Sample job list (replace with DB later if needed)
const jobs = [
    {
        title: "Frontend Developer",
        skills: ["React", "JavaScript"],
        workMode: "Remote",
        jobType: "Full-time",
    },
    {
        title: "Backend Developer",
        skills: ["Node.js", "MongoDB"],
        workMode: "Onsite",
        jobType: "Full-time",
    },
    {
        title: "Java Developer",
        skills: ["Java", "Spring Boot"],
        workMode: "Remote",
        jobType: "Part-time",
    },
];

// Detect filters from user input
function detectFilters(state) {
    const message = state.message.toLowerCase();

    return {
        ...state,
        filters: {
            title: message.includes("frontend")
                ? "Frontend Developer"
                : message.includes("backend")
                    ? "Backend Developer"
                    : message.includes("java")
                        ? "Java Developer"
                        : null,
            workMode: message.includes("remote")
                ? "Remote"
                : message.includes("onsite")
                    ? "Onsite"
                    : null,
            jobType: message.includes("full")
                ? "Full-time"
                : message.includes("part")
                    ? "Part-time"
                    : null,
        },
    };
}

// Filter jobs
function filterJobs(state) {
    let filtered = jobs;

    const { title, workMode, jobType } = state.filters;

    if (title) filtered = filtered.filter(j => j.title === title);
    if (workMode) filtered = filtered.filter(j => j.workMode === workMode);
    if (jobType) filtered = filtered.filter(j => j.jobType === jobType);

    return {
        ...state,
        result: filtered,
    };
}

// Build graph
const graph = new StateGraph({
    channels: {
        message: "string",
        filters: "object",
        result: "object",
    },
});

graph.addNode("detectFilters", detectFilters);
graph.addNode("filterJobs", filterJobs);

graph.setEntryPoint("detectFilters");
graph.addEdge("detectFilters", "filterJobs");
graph.setFinishPoint("filterJobs");

export const jobAssistant = graph.compile();
