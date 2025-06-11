export class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push({ task, completed: false });
    }

    markComplete(taskIndex) {
        if (taskIndex >= 0 && taskIndex < this.tasks.length) {
            this.tasks[taskIndex].completed = true;
        }
    }

    listTasks() {
        return this.tasks.map((task, index) => 
            `${index + 1}. [${task.completed ? '✓' : ' '}] ${task.task}`
        ).join('\n');
    }
}