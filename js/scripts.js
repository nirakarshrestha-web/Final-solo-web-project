document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");

  function setTheme(mode) {
    if (mode === "dark") {
      body.classList.add("dark-mode");
      if (themeToggle) themeToggle.textContent = "☀️";
    } else {
      body.classList.remove("dark-mode");
      if (themeToggle) themeToggle.textContent = "🌙";
    }
  }

  function getAutomaticTheme() {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "light" : "dark";
  }

  const savedTheme = localStorage.getItem("themePreference");
  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme);
  } else {
    setTheme(getAutomaticTheme());
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = body.classList.contains("dark-mode");
      if (isDark) {
        setTheme("light");
        localStorage.setItem("themePreference", "light");
      } else {
        setTheme("dark");
        localStorage.setItem("themePreference", "dark");
      }
    });
  }

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  function updateNepalTime() {
    const now = new Date();
    const nepal = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }));
    const el = document.getElementById("nepalClock");
    if (el) el.textContent = nepal.toLocaleTimeString();
  }

  function updateUserTime() {
    const now = new Date();
    const el = document.getElementById("userClock");
    if (el) el.textContent = now.toLocaleTimeString();
  }

  updateNepalTime();
  updateUserTime();

  setInterval(() => {
    updateNepalTime();
    updateUserTime();
  }, 1000);

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const messageError = document.getElementById("messageError");
      const formSuccess = document.getElementById("formSuccess");

      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      formSuccess.textContent = "";

      let isValid = true;

      if (name === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
      if (email === "") {
        emailError.textContent = "Please enter your email.";
        isValid = false;
      } else if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
      }

      if (message === "") {
        messageError.textContent = "Please enter your message.";
        isValid = false;
      } else if (message.length < 10) {
        messageError.textContent = "Message must be at least 10 characters.";
        isValid = false;
      }

      if (isValid) {
        formSuccess.textContent = "Form is working. Email service can be connected later.";
        contactForm.reset();
      }
    });
  }
});