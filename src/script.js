import "./style.css";
import { DOM } from './js/dom';
import { Project, Task } from "./js/classes";
import { globalContainer } from "./js/global";


window.addEventListener('DOMContentLoaded', () => {
  DOM.activateNav('Inbox');
  globalContainer.setActiveTitle('Inbox');
  DOM.displayTaskOfProject(globalContainer.findProject('Inbox'));
})

function validate(value) {
  //TRUE == INVALID
  //FALSE == VALID
  return value.length < 1;
}


//DEFAULTS NAV
const defaultsContainer = document.querySelector('.default-navs');
defaultsContainer.addEventListener('click', (event) => {
  const title = event.target.dataset.title;

  if (title !== undefined) {
    DOM.activateNav(event.target.id);
    globalContainer.setActiveTitle(title);
    DOM.displayTaskOfProject(globalContainer.findProject(title));
  }
})

//PROJECTS NAV
const projectContainer = document.querySelector('.project-container');
projectContainer.addEventListener('click', (event) => {
  let target = event.target;

  if (target.classList.contains('dnav') === "project-container") {
    return;
  }

  DOM.activateNav(target.id);
})


//SHOWING AND HIDING OF MODALS
const showProjectModalBtn = document.getElementById('showprojectmodal');
showProjectModalBtn.addEventListener('click', () => {
  const projectModal = document.getElementById('project-modal');
  projectModal.classList.add('show');
})

const addTaskModalBtn = document.getElementById('addtask-btn');
addTaskModalBtn.addEventListener('click', () => {
  const taskModal = document.getElementById('task-modal');
  taskModal.classList.add('show');
})

const closeModalBtns = document.querySelectorAll('.close-modal-btn');
Array.from(closeModalBtns).forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.remove('show');
  });
});


//CREATING PROJECT and TASK

const createBtns = document.querySelectorAll('.create');

createBtns.forEach(createBtn => {
  createBtn.addEventListener('click', (event) => {
    const target = event.target;

    if (target.id === 'create-project') {
      let title = document.getElementById('project-name-input').value;

      if (validate(title)) {
        alert('Invalid Name')
        return;
      }
  
      let newProject = new Project(title);
      globalContainer.addNewProject(newProject);

      document.getElementById('project-name-input').value = "";
    
      const projectModal = document.getElementById('project-modal');
      projectModal.classList.remove('show');
    }
    else if (target.id == 'create-task') {

      let name = document.getElementById('task-name-input').value;
      let description = document.getElementById('task-description-input').value;
      let dueDate = new Date(document.getElementById('dueDate-input').value);
      let importance = document.getElementById('priority-input').value;

      if (validate(name)) {
        alert('Invalid Name');
        return;
      }

      if (isNaN(dueDate.getTime())) {
        alert('Invalid Date');
        return;
      }

      let newTask = new Task(name, description, dueDate, importance);
      globalContainer.addNewTask(newTask);
      
      DOM.displayTaskOfProject(globalContainer.getActiveProject());

      document.getElementById('task-name-input').value = "";
      document.getElementById('task-description-input').value = "";
      document.getElementById('dueDate-input').value = "";
      document.getElementById('priority-input').value = "Extremely";

      const taskModal = document.getElementById('task-modal');
      taskModal.classList.remove('show');
    }
  })
})
