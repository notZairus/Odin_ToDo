import { Project, Task } from "./classes";

export const globalContainer = (function() {
  let allProjects = [];
  let activeProjectTitle = "Inbox";
  
  let inb = new Project('Inbox');
  inb.addTask(new Task("TASKKKK1", "lorem isandasjndasndas", new Date(), "Extremely"));
  let defaultProjects = [inb, new Project('This Week'), new Project('Upcomming')];

  function setDefaultProjects(updated) {
    defaultProjects = updated;
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

    defaultProjects.forEach(project => {
      if (project.title == activeProjectTitle) {
        activeProject = project;
      }
    })

    return activeProject;
  }

  function addNewProject(project) {
    allProjects.unshift(project);
  } 

  function addNewTask(task) {

    allProjects.forEach(project => {
      if (project.title == activeProjectTitle) {
        project.addTask(task);
      }
    })

    defaultProjects.forEach(project => {
      if (project.title == activeProjectTitle) {
        project.addTask(task);
      }
    })
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

  function getProjects() {
    return allProjects;
  }
  
  function getDefaultProjects() {
    return defaultProjects;
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

  return {
    setDefaultProjects,
    setProjects,
    addNewProject,
    addNewTask,
    clearAllProjects,
    setActiveTitle,
    getAllTask,
    getProjects,
    getDefaultProjects,
    getActiveProject,
    deleteProject,
    deleteTask
  }

})();


export function saveData() {
  localStorage.setItem('defaultProjects', JSON.stringify(globalContainer.getDefaultProjects()));
  localStorage.setItem('allProjects', JSON.stringify(globalContainer.getProjects()));
}