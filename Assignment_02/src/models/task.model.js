import db from '../config/db.js'

const tasks = [
    { id: 1, title: "Task 01", done: false },
    { id: 2, title: "Task 02", done: true },
    { id: 3, title: "Task 03", done: false }
]

function mapTask(row) {
    if (!row) return row
    return { ...row, done: !!row.done }
}

export function findAll() {
    return db.prepare('SELECT * FROM tasks').all().map(mapTask)
}

export function findById(id) {
    return mapTask(db.prepare('SELECT * FROM tasks WHERE id = ?').get(id))
}

export function insert(title) {
    const result = db.prepare('INSERT INTO tasks (title, done) VALUES (?, 0)').run(title)
    return findById(Number(result.lastInsertRowid))
}

export function update(id, title, done) {
    db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?').run(title, done ? 1 : 0, id)
    return findById(id)
}

export function remove(id) {
    const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id)
    return result.changes > 0
}