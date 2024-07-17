
import "./style.css";
import { DOM } from './js/dom';
import { Project, Task } from "./js/classes";
import { globalContainer, saveData } from "./js/global";


//COMPONENTS
const defaultsContainer = document.querySelector('.default-navs');
const projectContainer = document.querySelector('.project-container');
const showProjectModalBtn = document.getElementById('showprojectmodal');
const addTaskModalBtn = document.getElementById('addtask-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const createBtns = document.querySelectorAll('.create');



//FUNCTIONS
function displaySelectedProject(id, title) {
  DOM.activateNav(id);
  globalContainer.setActiveTitle(title);
  DOM.displayTaskOfProject(globalContainer.getActiveProject());
}

function validate(value) {
  //TRUE == INVALID
  //FALSE == VALID
  return value.length < 1;
}





//EVENT LISTENER
window.addEventListener('DOMContentLoaded', () => {
  let defaultproject = JSON.parse(localStorage.getItem('defaultProject'));
  let projects = JSON.parse(localStorage.getItem('allProjects'));
  
  let projectInstance = Object.create(Project.prototype);

  let genuineDefaultProject =  Object.assign(projectInstance, defaultproject);

  let genuineProjects = projects.map(proj => {
    let projectInstance = Object.create(Project.prototype);
    return Object.assign(projectInstance, proj);
  })

  globalContainer.setDefaultProject(genuineDefaultProject);
  globalContainer.setProjects(genuineProjects);

  DOM.displayProjects();
  displaySelectedProject('inbox', 'Inbox');
})

defaultsContainer.addEventListener('click', (event) => {
  const target = event.target

  alert('dsadad');
})

projectContainer.addEventListener('click', (event) => {
  let target = event.target;

  if (! target.classList.contains("project-container")) {
    displaySelectedProject(target.id, target.dataset.title);
  }
})

showProjectModalBtn.addEventListener('click', () => {
  const projectModal = document.getElementById('project-modal');
  projectModal.classList.add('show');
})

addTaskModalBtn.addEventListener('click', () => {
  const taskModal = document.getElementById('task-modal');
  taskModal.classList.add('show');
})

Array.from(closeModalBtns).forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.remove('show');
  });
});

createBtns.forEach(createBtn => {
  createBtn.addEventListener('click', (event) => {
    const target = event.target;

    if (target.id === 'create-project') {
      let title = document.getElementById('project-name-input').value;

      if (validate(title)) {
        alert('Invalid Name');
        return;
      }
  
      let newProject = new Project(title);
      globalContainer.addNewProject(newProject);
      DOM.displayProjects();

      document.getElementById('project-name-input').value = "";
    
      const projectModal = document.getElementById('project-modal');
      projectModal.classList.remove('show');

      saveData();
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

      saveData();
    }
  })
})