// PARQUE PASTITO — interacciones
"use strict";

// Tema manual con preferencia automática inicial según la hora.
const modeButton = document.getElementById("mode");
const prefersNight = () => {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 6;
};

function updateModeButton() {
  if (!modeButton) return;
  const isNight = document.body.classList.contains("night");
  modeButton.textContent = isNight ? "☀ Cambiar a día" : "☾ Cambiar a noche";
  modeButton.setAttribute("aria-pressed", String(isNight));
}

function toggleTheme() {
  document.body.classList.toggle("night");
  updateModeButton();
}

if (modeButton) modeButton.addEventListener("click", toggleTheme);
if (prefersNight()) document.body.classList.add("night");
updateModeButton();

// Pistas del mapa.
const hintButton = document.getElementById("hint-toggle");
const parkMap = document.getElementById("park-map");

if (hintButton && parkMap) {
  hintButton.addEventListener("click", () => {
    const active = parkMap.classList.toggle("show-hints");
    hintButton.textContent = active ? "Ocultar pistas" : "Mostrar pistas";
    hintButton.setAttribute("aria-pressed", String(active));
  });
}

// Mensajes secretos.
const messages = {
  paw: "Encontraste las huellitas de Perli. Parece que la Segunda al Mando estuvo inspeccionando esta parte del parque.",
  "flower-secret": "Encontraste la flor especial. ni mi amor ni esta flor se van a marchitar nunca, tienen un lugar especial en este parque",
  "letter-secret": "Debajo de la piedra había un sobre: ojala nunca te olvides de todo lo que significas para mi, y si algun dia te olvidas este lugar siempre va a estar aca para recordartelo",
  "pastito-secret": "Encontraste a El Pastito. esoo despues de tanto decirme que era un pasto termine teniendo un parque"
};

const notice = document.getElementById("secret-notice");
let noticeTimer;

function revealSecret(key) {
  if (!notice || !Object.prototype.hasOwnProperty.call(messages, key)) return;
  notice.textContent = messages[key];
  notice.classList.add("show");
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => notice.classList.remove("show"), 12000);
  notice.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.querySelectorAll("[data-secret]").forEach((secret) => {
  secret.addEventListener("click", () => revealSecret(secret.dataset.secret));
  secret.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      revealSecret(secret.dataset.secret);
    }
  });
});

// Recorrido de Perli: timers agrupados y cancelables.
const doorButton = document.getElementById("door");
const perliSecret = document.getElementById("perli-secret");
const perliScene = document.getElementById("perli-scene");
let perliBusy = false;
let perliTimers = [];

function clearPerliTimers() {
  perliTimers.forEach(window.clearTimeout);
  perliTimers = [];
}

function schedulePerli(callback, delay) {
  perliTimers.push(window.setTimeout(callback, delay));
}

function startPerliVisit() {
  if (!doorButton || !perliSecret || !perliScene || perliBusy) return;
  perliBusy = true;
  clearPerliTimers();
  perliScene.classList.remove("door-ajar", "returning");
  perliScene.classList.add("opening");
  doorButton.disabled = true;
  doorButton.textContent = "Perli está saliendo...";
  perliSecret.classList.remove("show");

  schedulePerli(() => {
    perliSecret.classList.add("show");
    doorButton.textContent = "Perli está inspeccionando";
  }, 1500);

  schedulePerli(() => {
    perliScene.classList.add("returning");
    doorButton.textContent = "Perli está volviendo a entrar";
  }, 4200);

  schedulePerli(() => {
    perliScene.classList.remove("opening", "returning");
    perliScene.classList.add("door-ajar");
    doorButton.disabled = false;
    doorButton.textContent = "Abrir la puerta";
    perliBusy = false;
    perliTimers = [];
  }, 5600);
}

if (doorButton) doorButton.addEventListener("click", startPerliVisit);

// Navegación desde los sectores del mapa.
document.querySelectorAll(".map-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const destination = document.querySelector(href);
    if (!destination) return;
    event.preventDefault();
    destination.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
