import "./style.css";
import { DOM } from './dom';



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

const showProjectModalBtn = document.getElementById('showprojectmodal');
showProjectModalBtn.addEventListener('click', () => {
  const projectModal = document.getElementById('project-modal');
  projectModal.classList.add('show');
  console.log(projectModal.classList);
})

const closeModalBtns = document.querySelectorAll('.close-modal-btn');
Array.from(closeModalBtns).forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.remove('show');
  });
});