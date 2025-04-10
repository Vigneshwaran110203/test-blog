function toggleSubDropdown(event, dropdownId, iconId) {
    event.preventDefault(); // Prevent anchor link navigation
    event.stopPropagation(); // Prevent event from bubbling
  
    let dropdown = document.getElementById(dropdownId);
    let icon = document.getElementById(iconId);
  
    // Hide all dropdowns except the one being toggled
    document.querySelectorAll('.dropdown-responsive').forEach(div => {
        if (div.id !== dropdownId) div.classList.add('hidden');
    });
  
    // Reset all icons except the one being toggled
    document.querySelectorAll('.size-5').forEach(img => {
        if (img.id !== iconId){ 
            img.classList.remove('rotate-180')
        }
    });
    
    // Toggle selected dropdown & rotate icon
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        dropdown.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// const subNavLink1=document.getElementById("sub-nav-link-1")
// const subNavLink2=document.getElementById("sub-nav-link-4")
// const subNavLinkHover1=document.getElementById("sub-nav-link-2")
// const subNavLinkHover2=document.getElementById("sub-nav-link-3")
// const subNavContainer1 = document.getElementById("container-1")
// const subNavContainer2 = document.getElementById("container-2")


// function showContentOnHover(showContent, hideContent, activeNav, inactiveNav) {
//     showContent.classList.remove("hidden");
//     hideContent.classList.add("hidden");

//     // Toggle active and inactive styles
//     activeNav.classList.add("bg-background");
//     activeNav.classList.remove("bg-white");

//     inactiveNav.classList.add("bg-white");
//     inactiveNav.classList.remove("bg-background");
// }

// // Add event listeners for hover effect
// subNavLink1.addEventListener("mouseover", () => showContentOnHover(subNavContainer1, subNavContainer2, subNavLink1, subNavLink2));
// subNavLink2.addEventListener("mouseover", () => showContentOnHover(subNavContainer2, subNavContainer1, subNavLink2, subNavLink1));

// Get elements
const subNavLink1 = document.getElementById("sub-nav-link-1"); // Main Nav 1
const subNavLink2 = document.getElementById("sub-nav-link-4"); // Main Nav 2
const subNavLinkHover1 = document.getElementById("sub-nav-link-2"); // Sub Nav 1
const subNavLinkHover2 = document.getElementById("sub-nav-link-3"); // Sub Nav 2
const subNavContainer1 = document.getElementById("container-1"); // Content 1
const subNavContainer2 = document.getElementById("container-2"); // Content 2

// Function to toggle content visibility
function showContentOnHover(showContent, hideContent, activeNav, inactiveNav) {
    // Show the selected container
    showContent.classList.remove("hidden");
    hideContent.classList.add("hidden");

    // Set active nav styles
    activeNav.classList.add("bg-background");
    activeNav.classList.remove("bg-white");

    // Reset inactive nav styles
    inactiveNav.classList.add("bg-white");
    inactiveNav.classList.remove("bg-background");
}

// Function to handle hover effect for sub-nav links
function handleSubNavHover(hoveredNav) {
    // Remove active background from all sub-nav links
    subNavLinkHover1.classList.remove("bg-background");
    subNavLinkHover2.classList.remove("bg-background");
    subNavLink1.classList.remove("bg-background")
    subNavLink2.classList.remove("bg-background")

    // Add background color to hovered sub-nav
    hoveredNav.classList.add("bg-background");
}

// Event listeners for main navigation (showing content)
subNavLink1.addEventListener("mouseover", () => showContentOnHover(subNavContainer1, subNavContainer2, subNavLink1, subNavLink2));
subNavLink2.addEventListener("mouseover", () => showContentOnHover(subNavContainer2, subNavContainer1, subNavLink2, subNavLink1));

// Event listeners for sub-navigation links (hover effect)
subNavLinkHover1.addEventListener("mouseover", () => handleSubNavHover(subNavLinkHover1));
subNavLinkHover1.addEventListener("mouseleave", ()=>{
    subNavLinkHover1.classList.remove("bg-background")
})
subNavLinkHover2.addEventListener("mouseover", () => handleSubNavHover(subNavLinkHover2));
subNavLinkHover2.addEventListener("mouseleave", ()=>{
    subNavLinkHover2.classList.remove("bg-background")
})
