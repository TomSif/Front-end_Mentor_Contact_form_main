import { inputText } from "./main.js";

// Function to forbid number in inputText
inputText.forEach((input) => {
  input.addEventListener("input", function () {
    const nameRegex = /^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\'\s]+$/; // no  numbers or symbols
    const value = input.value;

    if (!nameRegex.test(value)) {
      input.value = value.slice(0, -1);
    }
  });
});
