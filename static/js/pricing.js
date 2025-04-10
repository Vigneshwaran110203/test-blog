document.addEventListener("DOMContentLoaded", function (){

const pricingPlan1 = document.getElementById("pricing-plan-1")
const pricingPlan2 = document.getElementById("pricing-plan-2")
const toggleButton = document.getElementById("toggle-button")
const toggleSwitch = document.getElementById("toggle-switch")
const smallBusiness = document.getElementById("small-business")
const enterprise = document.getElementById("enterprise")
const smallBusinessText = document.getElementById("small-business-text")
const enterpriseText = document.getElementById("enterprise-text")
const smallBusinessPricingTable = document.getElementById("small-business-pricing-table")
const enterprisePricingTable = document.getElementById("enterprise-pricing-table")

toggleButton.addEventListener("click", ()=> {
    toggleSwitch.classList.toggle("right-shift")
    enterpriseText.classList.toggle("hidden")
    smallBusinessText.classList.toggle("hidden")
    smallBusinessPricingTable.classList.toggle("hidden")
    enterprisePricingTable.classList.toggle("hidden")
    pricingPlan2.classList.toggle("text-primary")
    pricingPlan1.classList.toggle("text-primary")
    enterprise.classList.toggle("hidden")
    smallBusiness.classList.toggle("hidden")
})


})

let activeAccordion = null;

function toggleAccordion(index){
    const accordions = document.querySelectorAll(".accordion-content")
    const accordionButton = document.querySelectorAll(".accordion-btn")

    if(activeAccordion !== null && activeAccordion !== index){
        accordions[activeAccordion].classList.add("hidden")
        accordionButton[activeAccordion].innerHTML = "+"
    }

    if (activeAccordion === index) {
        accordions[index].classList.add("hidden");
        accordionButton[index].innerText = "+"
        activeAccordion = null;
    } else {
        accordions[index].classList.remove("hidden");
        accordionButton[index].innerText = "-"
        activeAccordion = index;
    }
}