import { jobAssistant } from "../ai/langgraph/jobAssistant.js";

export default async function assistantRoutes(fastify) {
    fastify.post("/assistant/chat", async (request, reply) => {
        const { message } = request.body;

        const response = await jobAssistant.invoke({
            message,
        });

        return {
            message: "Filtered jobs based on your query",
            jobs: response.result,
        };
    });
}
