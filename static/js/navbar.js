const hamburgerBtn = document.getElementById("hamburger-btn")
const navLinkContainer = document.getElementById("nav-main-links-container")
const navigationBar = document.querySelector(".navigation-bar")
const closeBtn = document.getElementById("close-icon")
const navBar = document.querySelector(".nav-btn")

hamburgerBtn.addEventListener("click", ()=> {
    navLinkContainer.classList.add("open")
    navigationBar.classList.add("open")
    hamburgerBtn.classList.add("close")
    closeBtn.classList.add("open")
})

closeBtn.addEventListener("click", ()=> {
  navLinkContainer.classList.remove("open")
  navigationBar.classList.remove("open")
  hamburgerBtn.classList.remove("close")
  closeBtn.classList.remove("open")
})

let currentOpenNavbar = null;
const dropdownBtns = document.querySelectorAll(".small-dropdown-img")
const dropdownBtnArr = Array.from(dropdownBtns)

function toggleDropDown(event, dropdownId, dropdownBtnId){
  // Prevent link click from being blocked
    if (event.target.tagName.toLowerCase() === 'a') {
      return;
  }

  event.stopPropagation(); // Prevents click from bubbling to parent elements

    // event.preventDefault();

    // closing the current open dropdown
    if(currentOpenNavbar && currentOpenNavbar !== dropdownId){
        document.getElementById(currentOpenNavbar).classList.remove('show');
    }

    
    const dropdown = document.getElementById(dropdownId);
    const isVisible = dropdown.classList.contains('show');
    
    dropdownBtns.forEach((btn) => {
      const element = document.getElementById(btn.id);
    
      if (btn.id === dropdownBtnId) {
        // If the clicked button already has the class, toggle it off
        if (element.classList.contains("rotate-dropdown-btn")) {
          element.classList.remove("rotate-dropdown-btn");
        } else {
          // If not, add the class and remove it from others
          element.classList.add("rotate-dropdown-btn");
        }
      } else {
        // Ensure all other buttons do not have the rotate class
        element.classList.remove("rotate-dropdown-btn");
      }
    });
    

    if(isVisible){
        dropdown.classList.remove('show');
        currentOpenNavbar = null;
    }
    else {
        dropdown.classList.add('show');
        currentOpenNavbar = dropdownId;
    }
}