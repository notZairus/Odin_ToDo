import "./style.css";
import { DOM } from './dom';
import { Project } from "./classes";



const defaultNavsContainer = document.querySelector('.default-navs');
defaultNavsContainer.addEventListener('click', (event) => {
  let target = event.target;

  if (target.id != 'inbox' && target.id != 'week' && target.id != 'upcomming') {
    return;
  }

  DOM.activateNav(target.id);
})

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


//CREATING PROJECT

const createBtns = document.querySelectorAll('.create');
createBtns.forEach(createBtn => {
  createBtn.addEventListener('click', (event) => {
    const target = event.target;

    if (target.id === 'create-project') {

      //IMPLEMENT Create Project
      
      const projectModal = document.getElementById('project-modal');
      projectModal.classList.remove('show');
    }
    else if (target.id == 'create-task') {
      
      //IMPLEMENT Create Task

      const taskModal = document.getElementById('task-modal');
      taskModal.classList.remove('show');
    }
  })
})