// MODO DÍA Y NOCHE

const modeButton = document.getElementById("mode");

function toggleTheme() {
  document.body.classList.toggle("night");

  const isNight = document.body.classList.contains("night");

  modeButton.textContent = isNight
    ? "☀ Cambiar a día"
    : "☾ Cambiar a noche";
}

modeButton.addEventListener("click", toggleTheme);


// DETECTAR LA HORA PARA ELEGIR EL TEMA

function autoTheme() {
  const hour = new Date().getHours();

  if (hour >= 19 || hour < 6) {
    document.body.classList.add("night");
    modeButton.textContent = "☀ Cambiar a día";
  }
}

autoTheme();


// MOSTRAR U OCULTAR PISTAS DEL MAPA

const hintButton = document.getElementById("hint-toggle");
const parkMap = document.getElementById("park-map");

hintButton.addEventListener("click", () => {
  parkMap.classList.toggle("show-hints");

  const showingHints = parkMap.classList.contains("show-hints");

  hintButton.textContent = showingHints
    ? "Ocultar pistas"
    : "Mostrar pistas";
});


// MENSAJES DE LOS SECRETOS

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


// MOSTRAR UN SECRETO

function reveal(key) {
  const notice = document.getElementById("secret-notice");

  if (!messages[key]) return;

  notice.textContent = messages[key];
  notice.classList.add("show");

  notice.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}


// ACTIVAR SECRETOS CON CLIC O TECLADO

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


// PUERTA DE PERLI

const doorButton = document.getElementById("door");
const perliSecret = document.getElementById("perli-secret");

doorButton.addEventListener("click", () => {
  perliSecret.classList.toggle("show");

  const isOpen = perliSecret.classList.contains("show");

  doorButton.textContent = isOpen
    ? "Perli ya terminó la inspección"
    : "Tocar la puerta";
});
