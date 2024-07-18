
export class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.unshift(task);
  }

  getTasks() {
    return this.tasks;
  }

  getTitle() {
    return this.title;
  }

}

export class Task {
  constructor(title, description, dueDate, importance) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.importance = importance;
    this.completed = false;
  }
}