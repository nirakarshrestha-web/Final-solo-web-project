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

    const nepal = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })
    );

    const timeEl = document.getElementById("nepalClock");
    const dateEl = document.getElementById("nepalDate");

    if (timeEl) {
      timeEl.textContent = nepal.toLocaleTimeString();
    }

    if (dateEl) {
      dateEl.textContent = nepal.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  function updateUserTime() {
    const now = new Date();

    const timeEl = document.getElementById("userClock");
    const dateEl = document.getElementById("userDate");

    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString();
    }

    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  updateNepalTime();
  updateUserTime();

  setInterval(() => {
    updateNepalTime();
    updateUserTime();
  }, 1000);
});