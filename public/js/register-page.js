// Importando funções utilitárias
import {
  getCurrentTime,
  validEmail,
  redirectToMainPage,
  API,
  passwordValida,
  validName,
} from "./utils.js";

// Coletando variáveis do DOM
const botaoRegistrar = document.getElementById("botao-registro");
const closeModal = document.getElementById("close-modal");
const errorMessage = document.querySelector("dialog");

// Evento para fechar o modal ao clicar no botão
closeModal.addEventListener("click", () => {
  errorMessage.close();
});

// Evento para realizar as operações do registro
botaoRegistrar.addEventListener("click", async () => {
  // Coletando inputs do DOM
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  errorMessage.showModal();

  // Informações do usuário
  const name = nameInput.value.trim();
  const email = emailInput.value.toLowerCase().trim();
  const password = passwordInput.value.trim();

  // && passwordValida(password)
  // Caso o name, e-mail e a password sejam válidos
  if (validEmail(email) && validName(name)) {
    // Operações para fazer registro
    try {
      const response = await fetch(`${API}registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          criado_em: getCurrentTime(),
        }),
      });

      const data = await response.json();

      if (data.error === "USER_ALREADY_EXISTS") {
        // Tratando erro de usuário não encontrado
        showErrorMessage("USER_ALREADY_EXISTS");
      } else if (data.error) {
        // Tratando caso aconteça algum outro erro
        console.error("Unidentified error");
      } else {
        // Registro realizado com sucesso
        if (data.token) {
          emailInput.value = "";
          passwordInput.value = "";
          nameInput.value = "";

          // Definindo o token no localstorage
          localStorage.setItem("jwtToken", data.token);

          // Redirecionando para a tela inicial
          redirectToMainPage();
        } else {
          console.error("Token not found in server response");
        }
      }
    } catch (error) {
      // Unidentified error de login
      console.error("Error when logging in:", error);
    }
    return;
  } else if (!validName(name)) {
    showErrorMessage("INVALID_NAME");
  } else if (!validEmail(email)) {
    showErrorMessage("INVALID_EMAIL");
  } else if (!passwordValida(password)) {
    showErrorMessage("INVALID_PASSWORD_PLUS");
  } else {
    console.error("Unidentified error");
  }
});

// Função para mostrar na tela a mensagem de erro com base no tipo de erro fornecido
function showErrorMessage(errorType) {
  // Coletando DOM das mensagens de erro
  const errorEditableMessage = document.querySelector(".error-type");

  switch (errorType) {
    case "USER_ALREADY_EXISTS":
      errorEditableMessage.textContent =
        "Esse e-mail já existe na nossa base dados.";
      break;

    case "INVALID_PASSWORD":
      errorEditableMessage.textContent = "password inválida.";
      break;

    case "INVALID_EMAIL":
      errorEditableMessage.textContent = "Campo do e-mail inválido.";
      break;

    case "INVALID_PASSWORD_PLUS":
      errorEditableMessage.textContent =
        "A password deve conter no mínimo 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.";
      break;

    case "INVALID_NAME":
      errorEditableMessage.textContent =
        "name deve conter apenas letras, espaços, hífens e apóstrofos.";
      break;
  }

  errorMessage.showModal();
}
