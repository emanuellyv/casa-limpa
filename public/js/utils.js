// Development and deployment APIs
export const API = "http://localhost:3000/";
// export const API = "FUTURA_ROTA_DO_DEPLOY";

// Function to get the current time in postgres timestamp format
export function getCurrentTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const timestampPostgres = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return timestampPostgres;
}

// Function to validate if it is in email format
export function validEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regexEmail.test(email)) {
    return true;
  } else {
    return false;
  }
}

// Function to validate whether there are at least 8 characters, a lowercase letter, an uppercase letter, a number and a special character.
export function passwordValida(password) {
  const regexpassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!regexpassword.test(password)) {
    return false;
  } else {
    return true;
  }
}

// Function to direct the user to the main page
export function redirectToMainPage() {
  location.href = "/";
}

// Function to validate user name
export function validName(name) {
  // Regular expression to check if the name contains only letters, spaces, hyphens and apostrophes
  const regexname = /^[A-Za-zÀ-ÖØ-öø-ÿ-' ]+$/;

  return regexname.test(name);
}
