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

  //Deleting a project
  function deleteProject(projectTitle) {
    let index = allProjects.findIndex(project => project.title === projectTitle);
    allProjects.splice(index, 1);
  }

  //Deleting a task
  function deleteTaskFromProject(project, taskIndex) {
    project.getTasks().splice(taskIndex, 1);
    return true;
  }

  function findTaskIndex(tasks, taskTitle, taskDueDate) {
    return tasks.findIndex(task => task.title === taskTitle && parseInt(task.dueDate) === parseInt(taskDueDate));
  }

  function deleteTask(taskTitle, taskDueDate) {
    //Attempt to delete from defaultProject
    let defaultTasks = defaultProject.getTasks();
    let taskIndex = findTaskIndex(defaultTasks, taskTitle, taskDueDate);

    if (taskIndex !== -1) {
      if (deleteTaskFromProject(defaultProject, taskIndex)) return;
    }
    
    //attempt to delete from allProjects
    for (let i = 0; i < allProjects.length; i++) {
      let project = allProjects[i];
      taskIndex = findTaskIndex(project.getTasks(), taskTitle, taskDueDate);
    
      if (taskIndex !== -1) {
        if (deleteTaskFromProject(project, taskIndex)) return;
      }
    }

    console.log('TASK DELETION PROBLEM!');
  }

  //Completing a task
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