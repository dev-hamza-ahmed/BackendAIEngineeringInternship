import * as taskService from '../services/task.service.js'

export function getTasks(req, res) {
    res.json(taskService.getTasks(req.query))
}

export function getTaskById(req, res) {
    const task = taskService.getTaskById(Number(req.params.id))
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json(task)
}

export function createTask(req, res) {
    try {
        const newTask = taskService.createTask(req.body.title)
        res.status(201).json(newTask)
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export function updateTask(req, res) {
    const id = Number(req.params.id)
    try {
        const updated = taskService.updateTask(id, req.body)
        if (!updated) return res.status(404).json({ message: `Task ${id} not found` })
        res.json(updated)
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message })
    }
}

export function deleteTask(req, res) {
    const id = Number(req.params.id)
    const deleted = taskService.deleteTask(id)
    if (!deleted) return res.status(404).json({ message: `Task ${id} not found` })
    res.status(204).send()
}