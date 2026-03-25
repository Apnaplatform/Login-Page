const form = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorText = document.querySelector(".error-text");
const togglePassBtn = document.querySelector(".toggle-pass");
const eyeIcon = document.querySelector(".eye");
const loginBtn = document.querySelector(".login-btn");
const successState = document.querySelector(".success-state");

const showError = (message) => {
  errorText.textContent = message;
};

const clearError = () => {
  errorText.textContent = "";
};

const togglePassword = () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassBtn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
  eyeIcon.classList.toggle("hidden", isHidden);
};

const triggerRipple = (event) => {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  const rect = loginBtn.getBoundingClientRect();
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  loginBtn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
};

togglePassBtn.addEventListener("click", togglePassword);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (!emailValue || !passwordValue) {
    showError("Please enter both email/username and password.");
    return;
  }

  if (loginBtn.classList.contains("loading")) {
    return;
  }

  loginBtn.classList.add("loading");
  loginBtn.disabled = true;

  setTimeout(() => {
    loginBtn.classList.remove("loading");
    loginBtn.disabled = false;
    successState.classList.add("show");

    setTimeout(() => {
      successState.classList.remove("show");
    }, 1800);
  }, 2000);
});

loginBtn.addEventListener("click", triggerRipple);

document.querySelectorAll(".field input").forEach((input) => {
  input.addEventListener("input", () => {
    if (errorText.textContent) {
      clearError();
    }
  });
});
