
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