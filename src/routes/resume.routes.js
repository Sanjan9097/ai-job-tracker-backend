import pdf from 'pdf-parse';
import { saveResume, getResume } from '../services/resumeService.js';

export default async function resumeRoutes(app) {

    app.post('/resume/upload', async (req, reply) => {
        const data = await req.file();

        if (!data) {
            return reply.code(400).send({ error: 'No file uploaded' });
        }

        let text = '';

        if (data.mimetype === 'application/pdf') {
            const buffer = await data.toBuffer();
            const parsed = await pdf(buffer);
            text = parsed.text;
        } else if (data.mimetype === 'text/plain') {
            text = (await data.toBuffer()).toString();
        } else {
            return reply.code(400).send({ error: 'Only PDF or TXT allowed' });
        }

        // hardcoded test user
        saveResume('test@gmail.com', text);

        return { message: 'Resume uploaded successfully' };
    });

    app.get('/resume', async () => {
        const resumeText = getResume('test@gmail.com');
        return { resumeText };
    });

}
