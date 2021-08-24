function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");

const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const loc1 = document.getElementById("location1");
const loc2 = document.getElementById("location2");
const loc3 = document.getElementById("location3");
const loc4 = document.getElementById("location4");
const loc5 = document.getElementById("location5");
const loc6 = document.getElementById("location6");
const term = document.getElementById("checkbox1");

const errorFirst = document.getElementById("error-first");
const errorLast = document.getElementById("error-last");
const errorEmail = document.getElementById("error-email");
const errorBirthdate = document.getElementById("error-birthdate");
const errorQuantity = document.getElementById("error-quantity");
const errorCity = document.getElementById("error-city");
const errorTerm = document.getElementById("error-term");

const confirmation = document.getElementById("confirmation");
const confirmationCloseBtn = document.querySelectorAll(".btn-close");

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// Issue #1 : close modal
// Close modal on click on X
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// Close modal on click on confirmation button
confirmationCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Close modal with a display="none"
function closeModal() {
	modalbg.style.display = "none";
}

// Issue #2 & #3 : form validation
// Prevent submit if form is not validated
form.addEventListener("submit", (e) => {
	e.preventDefault();

	// Regex for form validation
	const nameRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ ,.'-]*){2}$/g;
	const emailRegex = /(?=^.{5,255}$)^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/g;
	const birthdateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
	const quantityRegex = /^[0-9]{1,2}$/g;

	var formValidated = true; // Need to be true to submit form

	// Function to check form inputs with regex and add errors messages if inputs are not validated
	function validateInput(input, regex, error, input) {
		const validated = input.value.match(regex);
		// If input is not validated : formValidated="false"
		if (!validated) {
			formValidated = false;
			error.style.display = "block";
			input.style.border = "0.2rem solid #fe142f";
		} else {
			error.style.display = "none";
			input.style.border = "0.05rem solid #ccc";
		}
	}

	validateInput(firstName, nameRegex, errorFirst, firstName);
	validateInput(lastName, nameRegex, errorLast, lastName);
	validateInput(email, emailRegex, errorEmail, email);
	validateInput(birthdate, birthdateRegex, errorBirthdate, birthdate);
	validateInput(quantity, quantityRegex, errorQuantity, quantity);

	// Check if one city is checked, if not add error message
	if (!loc1.checked && !loc2.checked && !loc3.checked && !loc4.checked && !loc5.checked && !loc6.checked) {
		errorCity.style.display = "block";
		formValidated = false;
	} else {
		errorCity.style.display = "none";
	}

	// Check if term is checked, if not add error message
	if (!term.checked) {
		errorTerm.style.display = "block";
		formValidated = false;
	} else {
		errorTerm.style.display = "none";
	}

	// Issue #4 : confirmation message
	// If form is validated, hide form and show confirmation message
	if (formValidated) {
		confirmation.style.display = "block";
		form.style.display = "none";
	}
});
