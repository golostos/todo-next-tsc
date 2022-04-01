import 'dotenv/config'
import express, { Request, Response } from "express";
import { body, ValidationError, validationResult } from 'express-validator';
import db, { Task } from '../prisma';

const app = express()

app.use('/api', express.json({ limit: '5kb' }))

app.get('/api/hello', (req, res) => {
    res.send('Hello')
})

type TaskDto = {
    name: string
    done: boolean
}

app.post('/api/task',
    body('name').isLength({ min: 1, max: 100 }),
    body('done').isBoolean(),
    async (req: Request<{}, {}, TaskDto>, res: Response<Task | { errors: ValidationError[] }>) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, done } = req.body
        const task = await db.task.create({
            data: {
                done,
                name
            }
        })
        res.send(task)
    })

app.listen(4000)