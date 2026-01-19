function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* --- Welle-Animation für den Namen --- */

document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".title");

  if (title) {
    const text = title.textContent;

    title.innerHTML = "";

    [...text].forEach((letter, index) => {
      const span = document.createElement("span");

      span.textContent = letter === " " ? "\u00A0" : letter;

      span.style.setProperty("--i", index);

      title.appendChild(span);
    });
  }
});
