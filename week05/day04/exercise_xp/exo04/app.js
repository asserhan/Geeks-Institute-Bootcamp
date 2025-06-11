import { TodoList } from './todo.js';

const myTodoList = new TodoList();

myTodoList.addTask('Buy groceries');
myTodoList.addTask('Do laundry');
myTodoList.addTask('Finish project');

myTodoList.markComplete(1);

console.log(myTodoList.listTasks());