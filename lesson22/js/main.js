'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
  }

  addToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.input.value = '';
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createElem, this);
    this.addToStorage();
  }

  createElem(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = item.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
          <button class="todo-remove"></button>
          <button class="todo-complete"></button>
        </div>
    `);

    if (item.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(event) {
    event.preventDefault();

    if (this.input.value.trim()) {
      this.input.classList.remove('error');
      this.input.placeholder = 'Какие планы?';

      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };

      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      this.input.value = '';
      this.input.classList.add('error');
      this.input.placeholder = 'Нельзя добавить пустоту!';
    }
  }

  generateKey() {
    return Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15);
  }

  deleteItem(target) {
    this.todoData.forEach(item => {
      if (target.closest('.todo-item').key === item.key) {
        this.todoData.delete(item.key);
        this.render();
      }
    });
  }

  completedItem(target) {
    this.todoData.forEach(item => {
      if (target.closest('.todo-item').key === item.key) {
        item.completed ? (item.completed = false) : (item.completed = true);
        this.render();
      }
    });
  }

  handler() {
    document.querySelector('.todo-container').addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('todo-remove')) {
        this.deleteItem(target);
      } else if (target.classList.contains('todo-complete')) {
        this.completedItem(target);
      }
    });
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.handler();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();