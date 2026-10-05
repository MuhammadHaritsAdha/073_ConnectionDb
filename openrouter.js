import express from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
    console.error('CRITICAL: OPENROUTER_API_KEY is not defined in .env');
    process.exit(1);
}

const chatRequestSchema = z.object({
    prompt: z
        .string({ required_error: 'Field promp wajib diisi' })
        .trim()
        .min(1, 'Prompt tidak boleh kosong')
        .max(4000, 'Prompt maksimal 4000 karakter'),
    model: z
        .string()
        .trim()
        .optional()
        .default(process.env.DEFAULT_MODEL),
    temperature: z
        .number()
        .min(0)
        .max(2)
        .optional()
        .default(0.7)
});

const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            error: 'Validasi gagal',
            details: result.error.errors.map((err) => ({
                field: err.path.join('.'),
                message: err.message
            }))
        });
    }
    req.validateBody = result.data;
    next();
};

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});