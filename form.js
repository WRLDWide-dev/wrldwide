const form = document.getElementById("brandForm");

form.addEventListener("submit", e => {
  let valid = true;

  form.querySelectorAll(".field").forEach(field =>
    field.classList.remove("error")
  );

  form.querySelectorAll("[required]").forEach(input => {
    if (!input.value.trim()) {
      input.closest(".field").classList.add("error");
      valid = false;
    }
  });

  if (!valid) e.preventDefault();
});

// REMOVE error when user interacts again
form.querySelectorAll("[required]").forEach(input => {
  input.addEventListener("input", () => {
    if (input.value.trim()) {
      input.closest(".field").classList.remove("error");
    }
  });
});
