(() => {
  "use strict";
  const setStatus = (element, message, type) => {
    if (!element) return;
    element.textContent = message;
    element.className = "form-status show " + type;
  };

  // Extra interaction 1: filter program cards by their data-category.
  // Extra interaction 2: filter student-life updates by data-news-category.
  const setupFilter = (buttonSelector, itemSelector, buttonDataKey, itemDataKey) => {
    const buttons = document.querySelectorAll(buttonSelector);
    const items = document.querySelectorAll(itemSelector);
    if (!buttons.length || !items.length) return;
    buttons.forEach(button => button.addEventListener("click", () => {
      const selected = button.dataset[buttonDataKey];
      buttons.forEach(candidate => {
        const active = candidate === button;
        candidate.classList.toggle("active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      items.forEach(item => {
        item.hidden = selected !== "all" && item.dataset[itemDataKey] !== selected;
      });
    }));
  };
  setupFilter("[data-program-filter]", ".program-item", "programFilter", "category");
  setupFilter("[data-news-filter]", ".news-item", "newsFilter", "newsCategory");

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const status = document.getElementById("contactStatus");
      const honeypot = document.getElementById("contactWebsite");
      if (honeypot && honeypot.value.trim() !== "") {
        setStatus(status, "Your message could not be processed.", "error");
        return;
      }
      let valid = true;
      contactForm.querySelectorAll("input[required], textarea[required]").forEach(field => {
        const ok = field.checkValidity() && field.value.trim() !== "";
        field.classList.toggle("is-invalid", !ok);
        field.setAttribute("aria-invalid", String(!ok));
        const feedback = field.parentElement.querySelector(".invalid-feedback");
        if (feedback) feedback.textContent = ok ? "" : (field.validity.typeMismatch ? "Enter a valid email address." : "Please complete this field.");
        if (!ok) valid = false;
      });
      if (!valid) {
        setStatus(status, "Please correct the highlighted fields and try again.", "error");
        contactForm.querySelector(".is-invalid")?.focus();
        return;
      }
      setStatus(status, "Thank you! Your message passed the demo validation. It has not been sent to an inbox.", "success");
      contactForm.reset();
      contactForm.querySelectorAll(".is-invalid").forEach(field => {
        field.classList.remove("is-invalid");
        field.removeAttribute("aria-invalid");
      });
    });
  }

  const registrationForm = document.getElementById("registrationForm");
  if (registrationForm) {
    const intakeDate = document.getElementById("intakeDate");
    if (intakeDate) {
      const now = new Date();
      const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      intakeDate.min = localToday;
    }
    registrationForm.addEventListener("submit", event => {
      event.preventDefault();
      const status = document.getElementById("registrationStatus");
      const password = document.getElementById("password");
      const confirmPassword = document.getElementById("confirmPassword");
      let valid = true;
      registrationForm.querySelectorAll("input[required], select[required]").forEach(field => {
        if (field.type === "radio" || field.type === "checkbox") return;
        let ok = field.checkValidity() && field.value.trim() !== "";
        let message = "Please check this field.";
        if (field.id === "password") {
          ok = field.value.length >= 8 && /\d/.test(field.value);
          message = "Use at least 8 characters and include a number.";
        } else if (field.id === "confirmPassword") {
          ok = field.value !== "" && field.value === password.value;
          message = "Passwords do not match.";
        } else if (field.validity.typeMismatch) {
          message = "Enter a valid email address.";
        } else if (field.id === "intakeDate") {
          message = "Choose today or a future intake date.";
        } else if (!field.value.trim()) {
          message = "This field is required.";
        }
        field.classList.toggle("is-invalid", !ok);
        field.setAttribute("aria-invalid", String(!ok));
        const feedback = field.parentElement.querySelector(".invalid-feedback");
        if (feedback) feedback.textContent = ok ? "" : message;
        if (!ok) valid = false;
      });
      const studyMode = registrationForm.querySelector('input[name="studyMode"]:checked');
      const studyModeError = document.getElementById("studyModeError");
      if (!studyMode) {
        if (studyModeError) studyModeError.textContent = "Choose a study mode.";
        valid = false;
      } else if (studyModeError) {
        studyModeError.textContent = "";
      }
      const terms = document.getElementById("terms");
      const termsError = document.getElementById("termsError");
      if (!terms.checked) {
        terms.classList.add("is-invalid");
        if (termsError) termsError.textContent = "You must agree before continuing.";
        valid = false;
      } else {
        terms.classList.remove("is-invalid");
        if (termsError) termsError.textContent = "";
      }
      if (!valid) {
        setStatus(status, "Please review the highlighted fields before submitting.", "error");
        registrationForm.querySelector(".is-invalid")?.focus();
        return;
      }
      setStatus(status, "Registration interest validated successfully! This is a demonstration only: no information or password has been sent or saved.", "success");
      registrationForm.reset();
      registrationForm.querySelectorAll(".is-invalid").forEach(field => {
        field.classList.remove("is-invalid");
        field.removeAttribute("aria-invalid");
      });
    });
  }
})();