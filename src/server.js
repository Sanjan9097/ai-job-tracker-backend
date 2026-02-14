import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import multipart from "@fastify/multipart";

import jobRoutes from "./routes/job.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import assistantRoutes from "./routes/assistantRoutes.js";

dotenv.config();

const app = Fastify({
    logger: true,
});

// Register plugins
await app.register(cors, { origin: true });
await app.register(multipart);

// Register routes
await app.register(jobRoutes);
await app.register(resumeRoutes);
await app.register(aiRoutes);
await app.register(assistantRoutes);

// Root route
app.get("/", async () => {
    return { message: "AI Job Tracker Backend Running 🚀" };
});

// Health route
app.get("/health", async () => {
    return { status: "Backend is running" };
});

// Start server
const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log("🚀 Server running at http://localhost:3000");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();

console.log("API KEY LOADED:", !!process.env.OPENAI_API_KEY);
