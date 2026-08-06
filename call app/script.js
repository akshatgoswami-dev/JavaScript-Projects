//SELECTORS
let addBtn = document.querySelector("#addBtn");

let model = document.querySelector("#modal");

let closeBtn = document.querySelector(".close");

let toast = document.querySelector("#toast");
let container = document.querySelector("#container");

const form = document.querySelector("#note-form");

const colors = document.querySelector(".colors");

const black = document.querySelector("#black");
const purple = document.querySelector("#purple");
const brown = document.querySelector("#brown");
const teal = document.querySelector("#teal");

const imageUrl = document.querySelector("#image-url");

const fullName = document.querySelector("#full-name");

const homeTown = document.querySelector("#home-town");

const purpose = document.querySelector("#purpose");

const chips = document.querySelector("#chips");

const categoryInputs = document.querySelectorAll(".category-input");

const emergency = document.querySelector("#emergency");

const important = document.querySelector("#important");

const urgent = document.querySelector("#urgent");

const noRush = document.querySelector("#no-rush");

const createBtn = document.querySelector(".create");

const cardCont = document.querySelector(".card-container");

let upBtn = document.querySelector("#up-btn");

let downBtn = document.querySelector("#down-btn");
const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

//CODE STARTS FROM HERE

// if (displayCards(allTasks === null)) {
//   console.log("no tasks");
// }

function SaveToLocalStorage(obj) {
  if (localStorage.getItem("tasks") === null) {
    let oldTasks = [];
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  } else {
    let oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
  displayCards(JSON.parse(localStorage.getItem("tasks")) || []);
}

addBtn.addEventListener("click", () => {
  model.classList.remove("model-hide");
});

closeBtn.addEventListener("click", () => {
  model.classList.add("model-hide");
});

upBtn.addEventListener("click", () => {
  cardCont.scrollBy({
    top: -300,
    behavior: "smooth",
  });
});

downBtn.addEventListener("click", () => {
  cardCont.scrollBy({
    top: 300,
    behavior: "smooth",
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const textFields =
    imageUrl.value.trim() !== "" &&
    fullName.value.trim() !== "" &&
    homeTown.value.trim() !== "" &&
    purpose.value.trim() !== "";

  const categorySelected =
    emergency.checked || important.checked || urgent.checked || noRush.checked;

  if (!textFields) {
    showToast("⚠️ Please fill in all the fields.");
    return;
  }

  if (!categorySelected) {
    showToast("⚠️ Please select a category.");
    return;
  }

  const selected = document.querySelector(".category-input:checked").value;

  const task = {
    imageUrl: imageUrl.value,
    fullName: fullName.value,
    homeTown: homeTown.value,
    purpose: purpose.value,
    selected,
  };
  SaveToLocalStorage(task);
  form.reset();
  model.classList.add("model-hide");
});

function displayCards(tasks) {
  cardCont.innerHTML = "";

  if (tasks.length === 0) {
    cardCont.innerHTML = `
             <div class="card default-ux">
          <div class="avatar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYiOQXxGSR3-EDKXEcZ9GfVUXWM4FAnYzWMw&s"
              alt="default"
            />
          </div>
          <div class="info">Nothing here yet</div>
          <div class="actions">
            <h2>create a card with "+"</h2>
          </div>
        </div>
        `;
    return;
  }

  tasks.forEach((task) => {
    createCard(task);
  });
}

console.log(allTasks);
displayCards(allTasks);

function createCard(task) {
  const card = document.createElement("div");
  card.className = "card";
  // Avatar
  const header = document.createElement("div");
  header.className = "img-name";
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  const img = document.createElement("img");
  img.src = task.imageUrl;
  img.alt = task.fullName;
  avatar.append(img);
  // Name
  const name = document.createElement("h2");
  name.textContent = task.fullName;
  name.classList.add("username");
  header.append(avatar, name);
  // Info
  const info = document.createElement("div");
  info.className = "info";
  const hometown = document.createElement("div");
  hometown.classList.add("hometown");
  const townTitle = document.createElement("span");
  townTitle.classList.add("townTitle");
  townTitle.textContent = "HomeTown";
  const town = document.createElement("p");
  town.classList.add("town");
  town.textContent = task.homeTown;
  hometown.append(townTitle, town);
  const category = document.createElement("div");
  category.classList.add("CardCategory");
  const categoryTitle = document.createElement("span");
  categoryTitle.classList.add("categoryTitle");
  categoryTitle.textContent = "Category";
  const categoryValue = document.createElement("p");
  categoryValue.classList.add("categoryValue");
  categoryValue.textContent = task.selected;
  category.append(categoryTitle, categoryValue);
  info.append(hometown, category);

  // Buttons
  const actions = document.createElement("div");
  actions.className = "actions";

  const callBtn = document.createElement("button");
  callBtn.className = "SendCall";
  callBtn.innerHTML = `<i class="ri-phone-line"></i> Call`;

  const msgBtn = document.createElement("button");
  msgBtn.className = "SendMsg";
  msgBtn.textContent = "Message";

  callBtn.addEventListener("click", () => {
    showToast("🚧 This feature is not available yet.");
  });

  msgBtn.addEventListener("click", () => {
    showToast("🚧 This feature is not available yet.");
  });

  actions.append(callBtn, msgBtn);

  // Assemble card
  card.append(header, info, actions);

  cardCont.appendChild(card);
  return cardCont;
}

function filterCategory(category) {
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filtered = allTasks.filter((task) => task.selected === category);
  displayCards(filtered);
}
black.addEventListener("click", () => {
  console.log("black");
  filterCategory("Emergency");
});

purple.addEventListener("click", () => {
  console.log("purple");
  filterCategory("Urgent");
});

brown.addEventListener("click", () => {
  console.log("brown");
  filterCategory("Important");
});

teal.addEventListener("click", () => {
  console.log("teal");
  filterCategory("No Rush");
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

