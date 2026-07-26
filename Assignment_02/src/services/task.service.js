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
    const existing = taskModel.findById(id)
    if (!existing) return null

    if (
        (!body.title && body.done === undefined) ||
        (body.title !== undefined && body.title.trim() === "")
    ) {
        const error = new Error("Invalid request body")
        error.status = 400
        throw error
    }

    const title = body.title !== undefined ? body.title : existing.title
    const done = body.done !== undefined ? body.done : existing.done
    return taskModel.update(id, title, done)
}

export function deleteTask(id) {
    return taskModel.remove(id)
}