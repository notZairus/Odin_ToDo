import { Project, Task } from "./classes";

export const globalContainer = (function() {
  let allProjects = [];
  let activeProjectTitle = "Inbox";
  
  let inb = new Project('Inbox');
  inb.addTask(new Task("TASKKKK1", "lorem isandasjndasndas", new Date(), "Extremely"));
  let defaultProjects = [inb, new Project('This Week'), new Project('Upcomming')];

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
  function getAllProjects() {
    return allProjects;
  }

  function addNewproject(project) {
    allProjects.unshift(project);
  } 

  function addNewTask(task) {

    allProjects.forEach(project => {
      if (project.title == activeProjectTitle) {
        project.addtask(task);
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

  function findProject(title) {
    let selectedProject;

    defaultProjects.forEach(project => {
      if (title == project.getTitle()) {
        selectedProject = project;
        return;
      }
    }); 

    if (selectedProject != undefined) {
      return selectedProject;
    }

    allProjects.forEach(project => {
      if (title == project.getTitle()) {
        selectedProject = project;
        return;
      }
    }); 

    return selectedProject;

  } 

  return {
    getAllProjects,
    addNewproject,
    addNewTask,
    clearAllProjects,
    setActiveTitle,
    getAllTask,
    getDefaultProjects,
    findProject,
    getActiveProject
  }

})();