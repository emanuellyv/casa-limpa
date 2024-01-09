// Importando funções utilitárias
import { validEmail, redirectToMainPage, API } from "./utils.js";

// Collecting variables from the DOM
const loginButton = document.getElementById("login-button");
const closeModal = document.getElementById("close-modal");
const errorMessage = document.querySelector("dialog");

// Event to close the modal when clicking the button
closeModal.addEventListener("click", () => {
  errorMessage.close();
});

// Event to perform login operations
loginButton.addEventListener("click", async () => {
  // Collecting DOM inputs
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  errorMessage.showModal();

  // User Information
  const email = emailInput.value.toLowerCase().trim();
  const password = passwordInput.value.trim();

  // If the email and password are valid
  if (validEmail(email) && password.length >= 3) {
    // Operações para fazer login
    try {
      const response = await fetch(`${API}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.error === "USER_NOT_FOUND") {
        // Handling user not found error
        showErrorMessage("USER_NOT_FOUND");
      } else if (data.error === "INVALID_PASSWORD") {
        // Handling invalid password error
        showErrorMessage("INVALID_PASSWORD");
      } else if (data.error) {
        // Dealing with any other error
        console.error("Unidentified error");
      } else {
        // Login successfully
        if (data.token) {
          emailInput.value = "";
          passwordInput.value = "";

          // Setting the token in localstorage
          localStorage.setItem("jwtToken", data.token);

          // Redirecting to home screen
          redirectToMainPage();
        } else {
          console.error("Token not found in server response");
        }
      }
    } catch (error) {
      // Unidentified error de login
      console.error("Error when logging in:", error);
    }
  } else if (!validEmail(email)) {
    showErrorMessage("INVALID_EMAIL");
  } else if (password.length <= 3) {
    showErrorMessage("INVALID_PASSWORD_PLUS");
  } else {
    console.error("Unidentified error");
  }
});

// Function to show the error message on the screen based on the given error type
function showErrorMessage(errorType) {
  // Collecting DOM from error messages
  const errorEditableMessage = document.querySelector(".error-type");

  switch (errorType) {
    case "USER_NOT_FOUND":
      errorEditableMessage.textContent = "Usuário não encontrado.";
      break;

    case "INVALID_PASSWORD":
      errorEditableMessage.textContent = "Sehna inválida.";
      break;

    case "INVALID_EMAIL":
      errorEditableMessage.textContent = "E-mail inválido.";
      break;

    case "INVALID_PASSWORD_PLUS":
      errorEditableMessage.textContent =
        "A senha deve conter no mínimo 3 caracteres.";
      break;
  }

  errorMessage.showModal();
}
