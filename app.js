import { languages, stepOrder, translations } from "./translations.mjs";

const languageScreen = document.querySelector("#language-screen");
const readerScreen = document.querySelector("#reader-screen");
const languageOptions = document.querySelector("#language-options");
const languageSearch = document.querySelector("#language-search");
const languageEmpty = document.querySelector("#language-empty");
const image = document.querySelector("#step-image");
const title = document.querySelector("#step-title");
const description = document.querySelector("#step-description");
const sectionLabel = document.querySelector("#section-label");
const stepLabel = document.querySelector("#step-label");
const stepCount = document.querySelector("#step-count");
const progressBar = document.querySelector("#progress-bar");
const languageLabel = document.querySelector("#language-label");
const translationNote = document.querySelector("#translation-note");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const languageButton = document.querySelector("#language-button");
const routePoints = document.querySelector("#route-points");
const imageBadge = document.querySelector("#image-badge");
const stepAnnouncement = document.querySelector("#step-announcement");
const completionScreen = document.querySelector("#completion-screen");
const restartButton = document.querySelector("#restart-button");
const completionLanguageButton = document.querySelector("#completion-language-button");

let language = "de";
let currentStep = 0;
const finalStep = stepOrder.length - 1;

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
}

function renderLanguages(filter = "") {
  const query = normalize(filter.trim());
  languageOptions.replaceChildren();
  let matches = 0;
  languages.forEach(({ code, nativeName, englishName, dir, flag }) => {
    if (query && !normalize(`${nativeName} ${englishName} ${code}`).includes(query)) return;
    matches += 1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-choice";
    button.dataset.language = code;
    button.dir = dir;
    button.innerHTML = `<span class="language-flag" aria-hidden="true"></span><span><strong></strong><small></small></span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>`;
    button.querySelector(".language-flag").textContent = flag;
    button.querySelector("strong").textContent = nativeName;
    button.querySelector("small").textContent = englishName;
    button.addEventListener("click", () => openReader(code));
    languageOptions.append(button);
  });
  languageEmpty.hidden = matches !== 0;
}

function stepFromUrl() {
  const value = Number(new URLSearchParams(location.search).get("step"));
  return Number.isInteger(value) && value >= 1 && value <= stepOrder.length ? value - 1 : 0;
}

function updateUrl() {
  const url = new URL(location.href);
  url.searchParams.set("step", String(currentStep + 1));
  url.searchParams.set("lang", language);
  url.searchParams.delete("complete");
  history.replaceState({}, "", url);
}

function renderRoute() {
  routePoints.replaceChildren();
  for (let index = 0; index < stepOrder.length; index += 1) {
    const point = document.createElement("span");
    point.className = `route-point${index < currentStep ? " done" : ""}${index === currentStep ? " current" : ""}`;
    point.textContent = String(index + 1);
    point.setAttribute("aria-current", index === currentStep ? "step" : "false");
    routePoints.append(point);
  }
}

function render() {
  const selected = languages.find(({ code }) => code === language) ?? languages[0];
  const { ui, steps } = translations[selected.code];
  const sourceStep = stepOrder[currentStep];
  const item = steps[sourceStep];
  document.documentElement.lang = selected.code;
  document.documentElement.dir = selected.dir;
  image.src = `assets/step-${String(sourceStep + 1).padStart(2, "0")}.webp`;
  image.alt = `${ui.step} ${currentStep + 1}: ${item.title}`;
  imageBadge.textContent = String(currentStep + 1).padStart(2, "0");
  title.textContent = item.title;
  description.textContent = item.description;
  sectionLabel.textContent = ui.section;
  stepLabel.textContent = ui.step;
  stepCount.textContent = `${currentStep + 1} / ${steps.length}`;
  stepAnnouncement.textContent = `${ui.step} ${currentStep + 1}: ${item.title}`;
  progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
  renderRoute();
  languageLabel.textContent = selected.nativeName;
  previousButton.querySelector("span").textContent = ui.back;
  nextButton.querySelector("span").textContent = currentStep === finalStep ? ui.finish : ui.next;
  previousButton.disabled = currentStep === 0;
  nextButton.classList.toggle("is-finish", currentStep === finalStep);
  translationNote.hidden = selected.code === "de";
  translationNote.textContent = ui.note;
  updateUrl();
}

function openReader(selectedLanguage) {
  if (!translations[selectedLanguage]) return;
  language = selectedLanguage;
  localStorage.setItem("mein-weg-zum-op-language", language);
  languageScreen.hidden = true;
  completionScreen.hidden = true;
  readerScreen.hidden = false;
  render();
  title.focus({ preventScroll: true });
}

function showLanguageScreen() {
  readerScreen.hidden = true;
  completionScreen.hidden = true;
  languageScreen.hidden = false;
  document.documentElement.lang = "de";
  document.documentElement.dir = "ltr";
  languageSearch.value = "";
  renderLanguages();
  languageSearch.focus();
}

function showCompletion() {
  readerScreen.hidden = true;
  languageScreen.hidden = true;
  completionScreen.hidden = false;
  const url = new URL(location.href);
  url.searchParams.delete("step");
  url.searchParams.set("complete", "1");
  history.replaceState({}, "", url);
  restartButton.focus();
}

languageSearch.addEventListener("input", () => renderLanguages(languageSearch.value));
previousButton.addEventListener("click", () => {
  if (currentStep > 0) { currentStep -= 1; render(); }
});
nextButton.addEventListener("click", () => {
  if (currentStep < finalStep) { currentStep += 1; render(); }
  else { showCompletion(); }
});
restartButton.addEventListener("click", () => { currentStep = 0; openReader(language); });
completionLanguageButton.addEventListener("click", showLanguageScreen);
languageButton.addEventListener("click", showLanguageScreen);
window.addEventListener("keydown", (event) => {
  if (readerScreen.hidden) return;
  const selected = languages.find(({ code }) => code === language) ?? languages[0];
  const forwardKey = selected.dir === "rtl" ? "ArrowLeft" : "ArrowRight";
  const backKey = selected.dir === "rtl" ? "ArrowRight" : "ArrowLeft";
  if (event.key === forwardKey && currentStep < finalStep) { currentStep += 1; render(); }
  if (event.key === backKey && currentStep > 0) { currentStep -= 1; render(); }
});
window.addEventListener("popstate", () => {
  if (new URLSearchParams(location.search).get("complete") === "1") { showCompletion(); return; }
  currentStep = stepFromUrl();
  openReader(language);
});

renderLanguages();
currentStep = stepFromUrl();
