import "./style.css";
import { DOM } from "./js/dom";
import { Project, Task } from "./js/classes";
import { globalContainer, saveData } from "./js/global";
import { format } from "date-fns";

//COMPONENTS
const defaultsContainer = document.querySelector(".default-navs");
const projectContainer = document.querySelector(".project-container");
const showProjectModalBtn = document.getElementById("showprojectmodal");
const addTaskModalBtn = document.getElementById("addtask-btn");
const closeModalBtns = document.querySelectorAll(".close-modal-btn");
const createBtns = document.querySelectorAll(".create");

//FUNCTIONS
function displaySelectedProject(id, title) {
  DOM.activateNav(id);
  globalContainer.setActiveTitle(title);
  DOM.displayTaskOfProject(globalContainer.getActiveProject());
}

function displayInbox() {
  DOM.activateNav("Inbox");
  DOM.setContentHeading("Inbox");
  DOM.clearTaskContainer();

  globalContainer.setActiveTitle("Inbox");

  let allTask = globalContainer.getAllTask();

  let sortedTask = allTask
    .sort((a, b) => a.dueDate - b.dueDate)
    .forEach((task) => {
      DOM.displayTask(task);
    });
}

function displayToday() {
  DOM.activateNav('today');
  DOM.setContentHeading('Today');
  DOM.clearTaskContainer();

  globalContainer.setActiveTitle('Inbox');

  let allTask = globalContainer.getAllTask();

  let sortedTask = allTask
    .sort((a, b) => a.dueDate - b.dueDate)
    .filter(task => {
      return format(new Date(), 'MMM-dd-yyyy') === format(new Date(task.dueDate), 'MMM-dd-yyyy');
    });

    sortedTask.forEach(task => {
      DOM.displayTask(task);
    });
}

function displayOverdue() {
  DOM.activateNav('overdue');
  DOM.setContentHeading('OverDue Tasks');
  DOM.clearTaskContainer();

  globalContainer.setActiveTitle("Inbox");

  let allTask = globalContainer.getAllTask();

  let sortedTask = allTask
  .sort((a, b) => a.dueDate - b.dueDate)
  .filter(task => {
    if (
      format(new Date(task.dueDate), "dd") < format(new Date(), "dd") && 
      format(new Date(task.dueDate), "MMM") == format(new Date(), "MMM") &&
      format(new Date(task.dueDate), "yyy") <= format(new Date(), "yyy")
    ) {
      return true;
    }
  })

  sortedTask.forEach(task => {
    DOM.displayTask(task);
  })
}

function validate(value) {
  //TRUE == INVALID
  //FALSE == VALID
  return value.length < 1;
}

//EVENT LISTENER
window.addEventListener("DOMContentLoaded", () => {
  let defaultproject = JSON.parse(localStorage.getItem("defaultProject"));
  let genuineDefaultProject = Object.assign(
    Object.create(Project.prototype),
    defaultproject
  );

  let projects = JSON.parse(localStorage.getItem("allProjects"));
  let genuineProjects = projects.map((proj) => {
    return Object.assign(Object.create(Project.prototype), proj);
  });

  globalContainer.setDefaultProject(genuineDefaultProject);
  globalContainer.setProjects(genuineProjects);

  DOM.displayProjects();
  displayInbox();
});

defaultsContainer.addEventListener("click", (event) => {
  const target = event.target;

  if (target.id == "inbox") {
    displayInbox();
  } else if (target.id == "today") {
    displayToday();
  } else if (target.id === "overdue") {
    displayOverdue();
  }
});

projectContainer.addEventListener("click", (event) => {
  let target = event.target;

  if (!target.classList.contains("project-container")) {
    displaySelectedProject(target.id, target.dataset.title);
  }
});

showProjectModalBtn.addEventListener("click", () => {
  const projectModal = document.getElementById("project-modal");
  projectModal.classList.add("show");
});

addTaskModalBtn.addEventListener("click", () => {
  const taskModal = document.getElementById("task-modal");
  taskModal.classList.add("show");
});

Array.from(closeModalBtns).forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.remove("show");
  });
});

createBtns.forEach((createBtn) => {
  createBtn.addEventListener("click", (event) => {
    const target = event.target;

    if (target.id === "create-project") {
      let title = document.getElementById("project-name-input").value;

      if (validate(title)) {
        alert("Invalid Name");
        return;
      }

      let newProject = new Project(title);
      globalContainer.addNewProject(newProject);
      DOM.displayProjects();

      document.getElementById("project-name-input").value = "";

      const projectModal = document.getElementById("project-modal");
      projectModal.classList.remove("show");

      saveData();
    } else if (target.id == "create-task") {
      let name = document.getElementById("task-name-input").value;
      let description = document.getElementById("task-description-input").value;
      let dueDate = new Date(
        document.getElementById("dueDate-input").value
      ).getTime();
      let importance = document.getElementById("priority-input").value;

      if (validate(name)) {
        alert("Invalid Name");
        return;
      }

      if (isNaN(new Date(dueDate).getTime())) {
        alert("Invalid Date");
        return;
      }

      let newTask = new Task(name, description, dueDate, importance);
      globalContainer.addNewTask(newTask);

      if (globalContainer.getActiveTitle() === "Inbox") {
        let contentHeading = document.querySelector(".h1-container h1");

        if (contentHeading.textContent === "Inbox") {
          displayInbox();
        } else if (contentHeading.textContent === "Today") {
          displayToday();
        } else if (contentHeading === "Upcomming") {
          displayDue();
        }

      } else {
        DOM.displayTaskOfProject(globalContainer.getActiveProject());
      }

      document.getElementById("task-name-input").value = "";
      document.getElementById("task-description-input").value = "";
      document.getElementById("dueDate-input").value = "";
      document.getElementById("priority-input").value = "Extremely";

      const taskModal = document.getElementById("task-modal");
      taskModal.classList.remove("show");

      saveData();
    }
  });
});
