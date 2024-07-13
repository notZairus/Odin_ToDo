import { Project, Task } from "./classes";
import { globalContainer } from "./global";
import trash from '../assets/trash.svg';
import { format } from 'date-fns';


export const DOM = (function () {

  function deactiveAllNavs() {
    const defaultNavsContainer = document.querySelector('.default-navs');
    Array.from(defaultNavsContainer.children).forEach(element => {
      element.classList.remove('active');
    })

    const projectContainer = document.querySelector(".project-container");
    Array.from(projectContainer.children).forEach(element => {
      element.classList.remove('active');
    })
  }

  function activateNav(id) {
    deactiveAllNavs();
    const targetNav = document.getElementById(id);
    targetNav.classList.add('active');
  }

  function displayTaskOfProject(project) {
    const header = document.querySelector('.h1-container h1');
    header.textContent = project.getTitle();
    
    const taskContainer = document.querySelector('.task-container'); 
    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }

    project.getTasks().forEach(task => {
      let taskk = document.createElement('div');
      taskk.classList.add('task');
      taskContainer.appendChild(taskk);

      let importance = document.createElement('div');
      importance.classList.add('importance', task.importance.toLowerCase());
      taskk.appendChild(importance);

      let status = document.createElement('input');
      status.type = "checkbox";
      taskk.appendChild(status);

      let taskInfo = document.createElement('div');
      taskInfo.classList.add("task-info");
      taskk.appendChild(taskInfo);

      let taskname = document.createElement('p');
      taskname.textContent = task.title;
      taskname.classList.add('taskname');
      taskInfo.appendChild(taskname);

      let taskdescription = document.createElement('p');
      taskdescription.textContent = task.description;
      taskdescription.classList.add('taskdesc');
      taskInfo.appendChild(taskdescription);

      let dueDate = document.createElement('p');
      dueDate.textContent = format(task.dueDate, "MMMM d");
      dueDate.classList.add('duedate');
      taskk.appendChild(dueDate);

      let deleteBtn = document.createElement('button');
      deleteBtn.dataset.ttitle = task.title;
      deleteBtn.classList.add('deletetask'); 
      taskk.appendChild(deleteBtn);

      let trashIcon = document.createElement('img');
      trashIcon.src = trash;
      deleteBtn.appendChild(trashIcon);

      deleteBtn.addEventListener('click', (event) => {
        globalContainer.deleteTask(deleteBtn.dataset.ttitle);
        taskContainer.removeChild(deleteBtn.parentElement);
      })
    })
  } 

  return {
    activateNav,
    displayTaskOfProject
  }

})();