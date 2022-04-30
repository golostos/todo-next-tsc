import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type Task = {
    id?: string
    name: string
    done: boolean
}

type TasksStateType = {
    status: string, 
    error?: string,
    tasks: Task[]
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await fetch('http://localhost:4000/api/task')
    return response.json()
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
    const response = await fetch('http://localhost:4000/api/task/' + id, {
        method: 'DELETE'
    })
    return response.json()
})

export const addTask = createAsyncThunk('tasks/addTask', async (newTask: Task) => {
    const response = await fetch('http://localhost:4000/api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    return response.json()
})

const initialState: TasksStateType = {
    status: 'idle',
    tasks: []
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // addTask: (state, action) => {
        //     state.tasks.push(action.payload as Task)
        // },
        // removeTask: (state, action) => {
        //     return {
        //         ...state,
        //         tasks: state.tasks.filter((task) =>
        //             task.id !== action.payload)
        //     }
        // },
        editTask: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload.id)
            if (task) {
                if (action.payload.name) task.name = action.payload.name
                if (action.payload.done) task.done = action.payload.done
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.tasks = action.payload
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        builder
            .addCase(deleteTask.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                // state.status = 'succeeded'
                // Add any fetched posts to the array
                return {
                    ...state,
                    status: 'succeeded',
                    tasks: state.tasks.filter((task) =>
                        task.id !== action.payload)
                }
            })
        builder
            .addCase(addTask.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.tasks.push(action.payload)
        })
    }
})

// Action creators are generated for each case reducer function
export const { editTask } = tasksSlice.actions

export default tasksSlice.reducer