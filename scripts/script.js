const Colors = [
  { name: "rojo", hex: "#FF0000", count: 0 },
  { name: "verde", hex: "#008000", count: 0 },
  { name: "azul", hex: "#0000FF", count: 0 },
  { name: "amarillo", hex: "#FFFF00", count: 0 },
  { name: "púrpura", hex: "#800080", count: 0 },
  { name: "turquesa", hex: "#40E0D0", count: 0 },
  { name: "naranja", hex: "#FFA500", count: 0 },
  { name: "rosa", hex: "#FFC0CB", count: 0 },
  { name: "marrón", hex: "#A52A2A", count: 0 },
  { name: "cian", hex: "#00FFFF", count: 0 },
  { name: "magenta", hex: "#FF00FF", count: 0 },
  { name: "lima", hex: "#00FF00", count: 0 },
  { name: "índigo", hex: "#4B0082", count: 0 },
  { name: "violeta", hex: "#EE82EE", count: 0 },
];

const title = document.querySelector(".title");
const addColor = document.querySelector(".add-color-btn");
const colorsGrid = document.querySelector(".colors-grid");
const resetPartyBtn = document.querySelector(".reset-party-btn");
const colorItemName = document.querySelector(".color-name");
const colorItemCount = document.querySelector(".color-count");
const initialColors = Colors.slice(0, 5);
const extraColors = Colors.slice(5, 14);
const dialog = document.querySelector(".warning-modal");
const selectionAudio = new Audio("assets/selection.mp3");
const notificactionAudio = new Audio("assets/notification.wav");
const btnSelectionAudio = new Audio("assets/btn-selection.wav");

addColor.addEventListener("click", addNewColor);

resetPartyBtn.addEventListener("click", resetParty);

const initialColorsRender = Colors.slice(0, 5).map((color) => {
  return `<div onClick="clickActions(id)" id="${color.name}" class="color ${color.name}" style="background-color: ${color.hex}"></div>`;
});

const extraColorsRender = Colors.slice(5, 14).map((color) => {
  return `<div onClick="clickActions(id)" id="${color.name}" class="dynamic-color color ${color.name}" style="background-color: ${color.hex}"></div>`;
});

colorsGrid.innerHTML = initialColorsRender.join("");

function clickActions(color) {
  selectionAudio.play();
  const colorDiv = document.getElementById(color);
  const bgColor = getComputedStyle(colorDiv).backgroundColor;
  title.style.color = bgColor;
  const colorObj =
    initialColors.find((c) => c.name === color) ||
    extraColors.find((c) => c.name === color);
  if (colorObj) {
    colorObj.count++;
  }
  console.log(colorObj);

  const maxColor = checkCountScore();

  colorItemName.innerHTML = maxColor.name + " con ";
  colorItemCount.innerHTML = maxColor.count + " voto(s) ";

  checkInactivity();
}

let inactivityTimeOut;

function checkInactivity() {
  if (inactivityTimeOut) {
    clearTimeout(inactivityTimeOut);
  }

  inactivityTimeOut = setTimeout(() => {
    resetParty();
    dialog.showModal();
    notificactionAudio.play();

    setTimeout(() => {
      dialog.close();
    }, 5000);
  }, 10000);
}

let colorIndex = 0;
function addNewColor() {
  btnSelectionAudio.play();
  colorsGrid.innerHTML += extraColorsRender[colorIndex];
  colorIndex++;
}

function resetParty() {
  btnSelectionAudio.play();
  Colors.forEach((color) => {
    color.count = 0;
  });
  colorItemName.innerHTML = "";
  colorItemCount.innerHTML = "";
  title.style.color = "white";
  colorIndex = 0;
  colorsGrid.innerHTML = initialColorsRender.join("");
}

function checkCountScore() {
  return Colors.reduce(
    (max, color) => (color.count > max.count ? color : max),
    Colors[0]
  );
}
