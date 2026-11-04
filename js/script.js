(() => {
  "use strict";
  const setStatus = (element, message, type) => {
    if (!element) return;
    element.textContent = message;
    element.className = "form-status show " + type;
  };
  const setupFilter = (selector, itemSelector, dataAttr) => {
    const buttons = document.querySelectorAll(selector);
    const items = document.querySelectorAll(itemSelector);
    if (!buttons.length || !items.length) return;
    buttons.forEach(button => button.addEventListener("click", () => {
      const value = button.dataset[dataAttr];
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      items.forEach(item => {
        item.hidden = value !== "all" && item.dataset[dataAttr.replace("Filter","Category")] !== value;
      });
    }));
  };
  setupFilter("[data-program-filter]", ".program-item", "programFilter");
  setupFilter("[data-news-filter]", ".news-item", "newsFilter");

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const status = document.getElementById("contactStatus");
      if (document.getElementById("contactWebsite")?.value) {
        setStatus(status, "Your message could not be processed.", "error");
        return;
      }
      let valid = true;
      contactForm.querySelectorAll("input[required],textarea[required]").forEach(field => {
        const feedback = field.parentElement.querySelector(".invalid-feedback");
        const ok = field.checkValidity() && field.value.trim() !== "";
        field.classList.toggle("is-invalid", !ok);
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
      contactForm.querySelectorAll(".is-invalid").forEach(field => field.classList.remove("is-invalid"));
    });
  }

  const registrationForm = document.getElementById("registrationForm");
  if (registrationForm) {
    const dateInput = document.getElementById("intakeDate");
    if (dateInput) {
      const today = new Date();
      const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10);
      dateInput.min = localToday;
    }
    registrationForm.addEventListener("submit", event => {
      event.preventDefault();
      const status = document.getElementById("registrationStatus");
      let valid = true;
      registrationForm.querySelectorAll("input[required],select[required]").forEach(field => {
        if (field.type === "radio" || field.type === "checkbox") return;
        let ok = field.checkValidity() && field.value.trim() !== "";
        if (field.id === "password") ok = ok && /\d/.test(field.value);
        if (field.id === "confirmPassword") ok = ok && field.value === document.getElementById("password").value;
        field.classList.toggle("is-invalid", !ok);
        const feedback = field.parentElement.querySelector(".invalid-feedback");
        if (feedback) feedback.textContent = ok ? "" : (field.id === "password" ? "Use at least 8 characters and include a number." : field.id === "confirmPassword" ? "Passwords do not match." : field.validity.typeMismatch ? "Enter a valid email address." : "Please check this field.");
        if (!ok) valid = false;
      });
      const radioChecked = registrationForm.querySelector('input[name="studyMode"]:checked');
      const radioError = document.getElementById("studyModeError");
      if (!radioChecked) { if (radioError) radioError.textContent = "Choose a study mode."; valid = false; }
      else if (radioError) radioError.textContent = "";
      const terms = document.getElementById("terms");
      const termsError = document.getElementById("termsError");
      if (!terms.checked) { terms.classList.add("is-invalid"); if (termsError) termsError.textContent = "You must agree before continuing."; valid = false; }
      else { terms.classList.remove("is-invalid"); if (termsError) termsError.textContent = ""; }
      if (!valid) {
        setStatus(status, "Please review the highlighted fields before submitting.", "error");
        registrationForm.querySelector(".is-invalid")?.focus();
        return;
      }
      setStatus(status, "Registration interest validated successfully! This is a demonstration only: no information or password has been sent or saved.", "success");
      registrationForm.reset();
      registrationForm.querySelectorAll(".is-invalid").forEach(field => field.classList.remove("is-invalid"));
    });
  }
})();