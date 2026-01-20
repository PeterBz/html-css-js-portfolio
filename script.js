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

/* --- DARK MODE TOGGLE --- */

function toggleTheme() {
  // 1. Body Klasse umschalten
  document.body.classList.toggle("dark-mode");
  
  // 2. Prüfen, ob Dark Mode an ist
  const isDark = document.body.classList.contains("dark-mode");
  
  //  (Optional) Speichern im Browser, damit es beim Neuladen bleibt
  // localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* Automatische Erkennung beim Laden (Prüfungsaufgabe Query) */
// Wenn der Nutzer im System "Dark" eingestellt hat, aktivieren wir es direkt
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

/* --- ANIMATED THEME TOGGLE LOGIC --- */

const storageKey = 'theme-preference';

const onClick = () => {
  // Aktuellen Wert umdrehen
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
}

const getColorPreference = () => {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey);
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

const reflectPreference = () => {
  // 1. Für die Button-Animation (data-theme auf HTML Tag)
  document.firstElementChild.setAttribute('data-theme', theme.value);

  // 2. Für dein CSS-Design (Klasse auf Body)
  if (theme.value === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  // 3. Accessibility Updates für beide Buttons
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.setAttribute('aria-label', theme.value);
  });
}

const theme = {
  value: getColorPreference(),
}

// Sofort beim Laden setzen (verhindert Flackern)
reflectPreference();

window.onload = () => {
  // Listener auf beide Buttons (Desktop & Mobil) setzen
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', onClick);
  });
}

// Synchronisierung mit System-Einstellungen
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches: isDark}) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });