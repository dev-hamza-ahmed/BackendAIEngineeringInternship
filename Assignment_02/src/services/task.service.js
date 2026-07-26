import * as taskModel from '../models/task.model.js'

export function getTasks() {
    return taskModel.findAll()
}

export function getTaskById(id) {
    return taskModel.findById(id)
}

export function createTask(title) {
    if (!title || title.trim() === "") {
        const error = new Error("Title is required")
        error.status = 400
        throw error
    }
    return taskModel.insert(title)
}

export function updateTask(id, body) {
    const task = taskModel.findById(id)
    if (!task) return null

    if (
        (!body.title && body.done === undefined) ||
        (body.title !== undefined && body.title.trim() === "")
    ) {
        const error = new Error("Invalid request body")
        error.status = 400
        throw error
    }

    return taskModel.updateTask(task, body)
}

export function deleteTask(id) {
    return taskModel.removeById(id)
}