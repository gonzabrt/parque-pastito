
// ==========================================
// MODO DÍA Y NOCHE
// ==========================================

const modeButton = document.getElementById("mode");

function updateModeButton() {
  if (!modeButton) return;

  const isNight = document.body.classList.contains("night");

  modeButton.textContent = isNight
    ? "☀ Cambiar a día"
    : "☾ Cambiar a noche";
}

function toggleTheme() {
  document.body.classList.toggle("night");
  updateModeButton();
}

if (modeButton) {
  modeButton.addEventListener("click", toggleTheme);
}

function autoTheme() {
  const hour = new Date().getHours();

  if (hour >= 19 || hour < 6) {
    document.body.classList.add("night");
  }

  updateModeButton();
}

autoTheme();


// ==========================================
// PISTAS DEL MAPA
// ==========================================

const hintButton = document.getElementById("hint-toggle");
const parkMap = document.getElementById("park-map");

if (hintButton && parkMap) {
  hintButton.addEventListener("click", () => {
    parkMap.classList.toggle("show-hints");

    const showingHints = parkMap.classList.contains("show-hints");

    hintButton.textContent = showingHints
      ? "Ocultar pistas"
      : "Mostrar pistas";
  });
}


// ==========================================
// MENSAJES DE LOS SECRETOS
// ==========================================

const messages = {
  paw:
    "Encontraste las huellitas de Perli. Parece que la Segunda al Mando estuvo inspeccionando esta parte del parque.",

  "flower-secret":
    "Encontraste la flor especial. ni mi amor ni esta flor se van a marchitar nunca, tienen un lugar especial en este parque",

  "letter-secret":
    "Debajo de la piedra había un sobre: ojala nunca te olvides de todo lo que significas para mi, y si algun dia te olvidas este lugar siempre va a estar aca para recordartelo",

  "pastito-secret":
    "Encontraste a El Pastito. esoo despues de tanto decirme que era un pasto termine teniendo un parque"
};

function reveal(key) {
  const notice = document.getElementById("secret-notice");

  if (!notice || !messages[key]) return;

  notice.textContent = messages[key];
  notice.classList.add("show");

  notice.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

document.querySelectorAll("[data-secret]").forEach((secret) => {
  secret.addEventListener("click", () => {
    reveal(secret.dataset.secret);
  });

  secret.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      reveal(secret.dataset.secret);
    }
  });
});


// ==========================================
// PUERTA DE PERLI
// ==========================================

const doorButton = document.getElementById("door");
const perliSecret = document.getElementById("perli-secret");
const perliScene = document.getElementById("perli-scene");

let perliBusy = false;
let perliTimers = [];

function clearPerliTimers() {
  perliTimers.forEach((timer) => clearTimeout(timer));
  perliTimers = [];
}

function startPerliVisit() {
  if (!doorButton || !perliSecret || !perliScene || perliBusy) {
    return;
  }

  perliBusy = true;

  clearPerliTimers();

  perliScene.classList.remove(
    "door-ajar",
    "returning"
  );

  perliScene.classList.add("opening");

  doorButton.disabled = true;
  doorButton.textContent = "Perli está saliendo...";

  perliSecret.classList.remove("show");

  // Perli termina de salir.

  perliTimers.push(setTimeout(() => {
    perliSecret.classList.add("show");
    doorButton.textContent = "Perli está inspeccionando";
  }, 1500));

  // Perli vuelve a entrar.

  perliTimers.push(setTimeout(() => {
    perliScene.classList.add("returning");
    doorButton.textContent = "Perli está volviendo a entrar";
  }, 4200));

  // La puerta queda entreabierta.

  perliTimers.push(setTimeout(() => {
    perliScene.classList.remove("opening", "returning");
    perliScene.classList.add("door-ajar");

    doorButton.disabled = false;
    doorButton.textContent = "Abrir la puerta";

    perliBusy = false;
  }, 5600));
}

if (doorButton) {
  doorButton.addEventListener("click", startPerliVisit);
}


// ==========================================
// NAVEGACIÓN DEL MAPA
// ==========================================

document.querySelectorAll(".map-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) return;

    const destination = document.querySelector(href);

    if (!destination) return;

    event.preventDefault();

    destination.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
