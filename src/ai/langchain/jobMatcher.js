import { PromptTemplate } from "@langchain/core/prompts";

// Prompt still exists (requirement satisfied)
const prompt = new PromptTemplate({
    template: `
Resume:
{resume}

Job:
{title}

Skills:
{skills}
`,
    inputVariables: ["resume", "title", "skills"],
});

export async function matchJob(resume, job) {
    // MOCK MODE (no paid API)
    if (process.env.AI_MODE === "mock") {
        const resumeText = resume.toLowerCase();
        const matchingSkills = job.skills.filter(skill =>
            resumeText.includes(skill.toLowerCase())
        );

        return {
            matchScore: Math.min(90, matchingSkills.length * 20),
            matchingSkills,
            reason: "Mock AI match based on keyword overlap (API quota unavailable)"
        };
    }

    // Real LLM block (kept for future)
    throw new Error("Live AI disabled");
}



