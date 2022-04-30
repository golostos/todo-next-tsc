import 'dotenv/config'
import express, { Request, Response } from "express";
import { body, ValidationError, validationResult } from 'express-validator';
import db, { Task } from '../prisma';
import cors from 'cors'

const app = express()
app.use(cors())

app.use('/api', express.json({ limit: '5kb' }))

type TaskDto = {
    name: string
    done: boolean
}

app.get('/api/task', async (req, res) => {
    const { take, skip } = req.query
    const tasks = await db.task.findMany(
        (take && skip) ? { take: +take, skip: +skip } : undefined
    )
    res.send(tasks)
})

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

app.delete('/api/task/:id', async (req, res) => {
    const { id } = req.params
    await db.task.delete({ where: { id } })
    // db.task.update({where: {id}}, )
    res.send({ success: true })
})

app.listen(4000)