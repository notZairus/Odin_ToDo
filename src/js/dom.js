import { Project, Task } from "./classes";
import { globalContainer, saveData } from "./global";
import trash from "../assets/trash.svg";
import { format } from "date-fns";

export const DOM = (function () {
  function deactiveAllNavs() {
    const defaultNavsContainer = document.querySelector(".default-navs");
    Array.from(defaultNavsContainer.children).forEach((element) => {
      element.classList.remove("active");
    });

    const projectContainer = document.querySelector(".project-container");
    Array.from(projectContainer.children).forEach((element) => {
      element.classList.remove("active");
    });
  }

  function activateNav(id) {
    deactiveAllNavs();
    const targetNav = document.getElementById(id.toLowerCase());
    targetNav.classList.add("active");
  }

  function displayProjects() {
    const projectContainer = document.getElementById("project-container");

    while (projectContainer.firstChild) {
      projectContainer.removeChild(projectContainer.firstChild);
    }

    let allProjects = globalContainer.getProjects();

    allProjects.forEach((project) => {
      const proj = document.createElement("div");
      proj.id = project.title.replaceAll(" ", "").toLowerCase();
      proj.dataset.title = project.title;
      proj.classList.add("project");
      projectContainer.appendChild(proj);

      const p = document.createElement("div");
      p.classList.add("ignore");
      p.textContent = project.title;
      proj.appendChild(p);

      const deleteBtn = document.createElement("button");
      deleteBtn.dataset.title = project.title;
      deleteBtn.classList.add("deleteproject");
      proj.appendChild(deleteBtn);

      const trashIcon = document.createElement("img");
      trashIcon.src = trash;
      deleteBtn.appendChild(trashIcon);

      deleteBtn.addEventListener("click", function (event) {
        globalContainer.deleteProject(deleteBtn.dataset.title);
        deleteBtn.parentElement.remove();
        console.log(globalContainer.getProjects());
        saveData();

        event.stopPropagation();
      });
    });
  }

  function clearTaskContainer() {
    const taskContainer = document.querySelector(".task-container");
    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }
  }

  function setContentHeading(title) {
    const header = document.querySelector(".h1-container h1");
    header.textContent = title;
  }

  function displayTask(task) {
    const taskContainer = document.querySelector(".task-container");

    let taskk = document.createElement("div");
    taskk.classList.add("task");
    taskContainer.appendChild(taskk);

    let importance = document.createElement("div");
    importance.classList.add("importance", task.importance.toLowerCase());
    taskk.appendChild(importance);

    let status = document.createElement("input");
    status.type = "checkbox";
    status.dataset.title = task.title;
    status.dataset.dueDate = task.dueDate;
    taskk.appendChild(status);

    let taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    taskk.appendChild(taskInfo);

    let taskname = document.createElement("p");
    taskname.textContent = task.title;
    taskname.classList.add("taskname");
    taskInfo.appendChild(taskname);

    let taskdescription = document.createElement("p");
    taskdescription.textContent = task.description;
    taskdescription.classList.add("taskdesc");
    taskInfo.appendChild(taskdescription);

    let dueDate = document.createElement("p");
    dueDate.textContent = format(task.dueDate, "MMM d");
    dueDate.classList.add("duedate");
    taskk.appendChild(dueDate);

    let deleteBtn = document.createElement("button");
    deleteBtn.dataset.title = task.title;
    deleteBtn.dataset.dueDate = task.dueDate;
    deleteBtn.classList.add("deletetask");
    taskk.appendChild(deleteBtn);

    let trashIcon = document.createElement("img");
    trashIcon.src = trash;
    deleteBtn.appendChild(trashIcon);

    function completeTask() {
      taskname.classList.add("completed");
      taskdescription.classList.add("completed");
      dueDate.classList.add("completed");
      importance.classList.add("completed");
      status.checked = true;
    }

    if (task.completed) {
      completeTask()
    }

    deleteBtn.addEventListener("click", (event) => {
      globalContainer.deleteTask(deleteBtn.dataset.title, deleteBtn.dataset.dueDate);
      taskContainer.removeChild(deleteBtn.parentElement);
      saveData();
    });

    status.addEventListener("click", (event) => {
      globalContainer.completeTask(status.dataset.title, status.dataset.dueDate);
      completeTask();
      saveData();
    });
  }

  function displayTaskOfProject(project) {
    setContentHeading(project.getTitle());
    clearTaskContainer();

    project.getTasks().forEach((task) => {
      displayTask(task);
    });
  }

  return {
    activateNav,
    clearTaskContainer,
    setContentHeading,
    displayTaskOfProject,
    displayProjects,
    displayTask,
  };
})();
