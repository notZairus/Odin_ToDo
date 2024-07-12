
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

  static findDefaultProject(title) {
    let selectedProject;

    globalContainer.getDefaultProjects().forEach(project => {
      if (title === project.getTitle()) {
        selectedProject = project;
        return;
      }
    });
    
    return selectedProject;
  }

}

export const globalContainer = (function() {
  let allProjects = [];
  let activeProjectTitle = "Inbox";
  let defaultProjects = [new Project('Inbox'), new Project('This Week'), new Project('Upcomming')];

  function getAllProjects() {
    return allProjects;
  }

  function addNewproject(project) {
    allProjects.unshift(project);
  } 

  function clearAllProjects() {
    allProjects = [];
  }

  function getActiveTitle() {
    return activeProjectTitle;
  }

  function setActiveTitle(title) {
    activeProjectTitle = title;
  }

  function getAllTask() {
    let allTask = [];
    allProjects.forEach(project => {
      project.tasks.forEach(task => {
        allTask.push(task);
      })
    })
    return allTask;
  }
  
  function getDefaultProjects() {
    return defaultProjects;
  }

  return {
    getAllProjects,
    addNewproject,
    clearAllProjects,
    getActiveTitle,
    setActiveTitle,
    getAllTask,
    getDefaultProjects
  }

})();