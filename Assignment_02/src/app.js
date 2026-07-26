import express from 'express'
import './config/db.js'   // opens db, creates table, seeds once
import taskRoutes from './routes/task.routes.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] })
})

app.get('/health', (req, res) => {
    res.json({ status: "ok" })
})

app.use('/tasks', taskRoutes)

export default app