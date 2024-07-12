import { Project, globalContainer } from "./objects";

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

  function displayProject(project) {
    const header = document.querySelector('.h1-container h1'); 
    header.textContent = project.getTitle();

    project.getTasks().forEach(task => {
      //GAWIN KO BUKASSSSS
    })
  } 

  return {
    activateNav,
    displayProject
  }

})();