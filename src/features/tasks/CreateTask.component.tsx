import { Button, TextField } from "@mui/material"
import { nanoid } from "nanoid"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { addTask } from "./tasksSlice"

export const CreateTask: React.FC = () => {
    const [name, setName] = useState('')
    const dispatch = useAppDispatch()
    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            dispatch(addTask({
                name,
                done: false,
            }))
            // dispatch(addTask())
        }}>
            <TextField 
                label="Task name" 
                variant="outlined" 
                value={name}
                onChange={(event) => setName(event.target.value)} />
            <Button type="submit">Add task</Button>
        </form>
    )
}