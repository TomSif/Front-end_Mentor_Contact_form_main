export const inputText = document.querySelectorAll(".inputNames");
const inputEmail = document.getElementById("email");
const inputTextarea = document.querySelector(".input__textarea");
const radios = document.querySelectorAll('input[name="queryType"]');
const emailHelp = document.getElementById("emailHelp");
const queryHelp = document.getElementById("queryTypeHelp");
const messageHelp = document.getElementById("messageHelp");
const consentHelp = document.getElementById("consentHelp");
const submitButton = document.querySelector(".input__submit");
const inputCheckbox = document.querySelector(".input__checkbox");
const success = document.querySelector(".success-state__container");
const inputRadios = document.querySelectorAll(".input__radio");
const progressBar = document.querySelector(".success-state__progress-bar");

// fonction d'écoute des boutons radio class active
inputRadios.forEach((radio, index) => {
  radio.addEventListener("click", () => {
    // Retirer la classe active de tous les boutons radio
    inputRadios.forEach((r) => r.classList.remove("active"));

    // Ajouter la classe active au bouton sélectionné
    radio.classList.add("active");

    // Sélectionner le bouton radio associé au clic sur la liste
    const correspondingRadio = radios[index];
    if (correspondingRadio) {
      correspondingRadio.checked = true; // Affectation correcte
      correspondingRadio.dispatchEvent(new Event("change")); // Déclencher l'événement
    }
  });
});

// Fonction pour valider chaque champ
function validateInputs() {
  let isValid = true;

  // Valider chaque champ de texte
  inputText.forEach((input) => {
    const errorMessage = input.nextElementSibling;
    const nameRegex = /^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\'\s]+$/;
    if (!nameRegex.test(input.value.trim())) {
      isValid = false;
      errorMessage.classList.remove("hidden");
    } else {
      errorMessage.classList.add("hidden");
    }
  });

  // Valider l'email
  if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      inputEmail.value.trim()
    )
  ) {
    isValid = false;
    emailHelp.classList.remove("hidden");
  } else {
    emailHelp.classList.add("hidden");
  }

  // Valider le textarea
  if (inputTextarea.value.trim() === "") {
    isValid = false;
    messageHelp.classList.remove("hidden");
  } else {
    messageHelp.classList.add("hidden");
  }

  // Valider les boutons radio
  const isChecked = Array.from(radios).some((radio) => radio.checked);
  if (!isChecked) {
    isValid = false;
    queryHelp.classList.remove("hidden");
  } else {
    queryHelp.classList.add("hidden");
  }

  // Valider inputCheckbox
  if (!inputCheckbox.checked) {
    isValid = false;
    consentHelp.classList.remove("hidden");
  } else {
    consentHelp.classList.add("hidden");
  }

  return isValid;
}

function resetForm() {
  // Réinitialiser les champs de texte et de textarea
  inputText.forEach((input) => (input.value = ""));
  inputEmail.value = "";
  inputTextarea.value = "";

  // Désélectionner les boutons radio
  radios.forEach((radio) => {
    radio.checked = false;
    radio.closest("li").classList.remove("active"); // Retirer la classe active du conteneur
  });

  // Désélectionner les checkboxes (si présentes)
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => (checkbox.checked = false));

  // Masquer les messages d’erreur (suppression de la classe d'erreur)
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((message) => message.classList.add("hidden"));

  console.log("Le formulaire a été réinitialisé !");
}
let timeOut;
// Écouteur d'événements sur le bouton de soumission
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  const allInputsValid = validateInputs();

  if (allInputsValid) {
    success.classList.remove("hidden");
    progressBar.style.transition = "transform 4s linear";
    progressBar.style.transform = "scaleX(1)";
    console.log("This a success!");
  } else {
    success.classList.add("hidden");
    console.log("Please correct errors");
  }
  timeOut = setTimeout(() => {
    resetForm();
    success.classList.add("hidden");
  }, 4000);
});
