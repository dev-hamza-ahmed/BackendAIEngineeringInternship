const tasks = [
    { id: 1, title: "Task 01", done: false },
    { id: 2, title: "Task 02", done: true },
    { id: 3, title: "Task 03", done: false }
]

export function findAll() {
    return tasks
}

export function findById(id) {
    return tasks.find(task => task.id === id)
}

export function insert(title) {
    const newTask = { id: tasks.length + 1, title, done: false }
    tasks.push(newTask)
    return newTask
}

export function updateTask(task, changes) {
    if (changes.title !== undefined) task.title = changes.title
    if (changes.done !== undefined) task.done = changes.done
    return task
}

export function removeById(id) {
    const index = tasks.findIndex(task => task.id === id)
    if (index === -1) return false
    tasks.splice(index, 1)
    return true
}