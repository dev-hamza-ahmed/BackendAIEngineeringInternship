import express from 'express'

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const tasks = [
    {
        "id": 1,
        "title": "Task 01",
        "done": false
    },
    {
        "id": 2,
        "title": "Task 02",
        "done": true
    },
    {
        "id": 3,
        "title": "Task 03",
        "done": false
    }
]

app.get('/', (req, res) => {
    res.json({
        "name": "Task API",
        "version": "1.0",
        "endpoints": ["/tasks"]
    })
})

app.get('/health', (req, res) => {
    res.json({
        "status": "ok"
    })
})

app.get('/tasks', (req, res) => {
    res.json(tasks)
})

app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    const task = tasks.find(task => task.id === id)
    
    if (!task) {
        return res.status(404).json( { "error": `Task ${id} not found` } )
    }  
    res.json(task)
})

app.post('/tasks', (req, res) => {
    if(!req.body.title || req.body.title.trim() === "") {
        return res.status(400).json({
            "message": "Title is required"
        })
    }
    
    const newTask = {
        "id": tasks.length + 1,
        "title": req.body.title,
        "done": false
    }
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})
