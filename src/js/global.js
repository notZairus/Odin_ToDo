import { Project, Task } from "./classes";

export const globalContainer = (function() {
  let allProjects = [];
  let activeProjectTitle = "Inbox";
  
  let inb = new Project('Inbox');
  let defaultProject = new Project('Inbox');

  function setDefaultProject(updated) {
    defaultProject = updated;
  }

  function setProjects(updated) {
    allProjects = updated;
  }

  function getActiveProject() {
    let activeProject;

    allProjects.forEach(project => {
      if (project.title == activeProjectTitle) {
        activeProject = project;
      }
    })

    if (defaultProject.getTitle() == activeProjectTitle) {
      activeProject = defaultProject;
    }

    return activeProject;
  }

  function addNewProject(project) {
    allProjects.unshift(project);
  } 

  function addNewTask(task) {
    let index = allProjects.findIndex(proj => proj.getTitle() == activeProjectTitle);
    
    if (index >= 0) {
      allProjects[index].addTask(task);
      return;
    }

    defaultProject.addTask(task);
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
    let allTask = [...defaultProject.getTasks()];
    
    allProjects.forEach(project => {
      project.tasks.forEach(task => {
        allTask.push(task);
      })
    })

    return allTask;
  }

  function getProjects() {
    return allProjects;
  }
  
  function getDefaultProject() {
    return defaultProject;
  }

  function deleteProject(projectTitle) {
    let index = allProjects.findIndex(project => project.title === projectTitle);
    allProjects.splice(index, 1);
  }

  function deleteTask(taskTitle) {
    let project = getActiveProject();
    let index = project.tasks.findIndex(task => task.title == taskTitle);
    project.tasks.splice(index, 1);
  }

  function completeTask(taskTitle) {

  }

  return {
    setDefaultProject,
    setProjects,
    addNewProject,
    addNewTask,
    clearAllProjects,
    setActiveTitle,
    getAllTask,
    getProjects,
    getDefaultProject,
    getActiveProject,
    deleteProject,
    deleteTask,
    completeTask,
    getActiveTitle
  }

})();


export function saveData() {
  localStorage.setItem('defaultProject', JSON.stringify(globalContainer.getDefaultProject()));
  localStorage.setItem('allProjects', JSON.stringify(globalContainer.getProjects()));
}