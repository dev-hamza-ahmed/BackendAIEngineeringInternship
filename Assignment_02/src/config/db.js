import { DatabaseSync } from 'node:sqlite'

const db = new DatabaseSync('tasks.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0
    )
`)

const { count } = db.prepare('SELECT COUNT(*) AS count FROM tasks').get()

if (count === 0) {
    const seed = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)')
    seed.run('Task 01', 0)
    seed.run('Task 02', 1)
    seed.run('Task 03', 0)
}

export default db