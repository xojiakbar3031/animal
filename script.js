const animals = [
  { id: 1, name: "Lion", type: "Mammal", img: "", lifespan: "12-16 years" },
  { id: 2, name: "Tiger", type: "Mammal", img: "", lifespan: "10-15 years" },
  { id: 3, name: "Elephant", type: "Mammal", img: "", lifespan: "60-70 years" },
  { id: 4, name: "Giraffe", type: "Mammal", img: "", lifespan: "25 years" },
  { id: 5, name: "Zebra", type: "Mammal", img: "", lifespan: "20-25 years" },
  { id: 6, name: "Panda", type: "Mammal", img: "", lifespan: "20 years" },
  { id: 7, name: "Kangaroo", type: "Mammal", img: "", lifespan: "20 years" },
  { id: 8, name: "Wolf", type: "Mammal", img: "", lifespan: "13 years" },
  { id: 9, name: "Fox", type: "Mammal", img: "", lifespan: "5-10 years" },
  { id: 10, name: "Bear", type: "Mammal", img: "", lifespan: "20-30 years" },
  { id: 11, name: "Eagle", type: "Bird", img: "", lifespan: "20-30 years" },
  { id: 12, name: "Parrot", type: "Bird", img: "", lifespan: "50 years" },
  { id: 13, name: "Owl", type: "Bird", img: "", lifespan: "15-25 years" },
  { id: 14, name: "Penguin", type: "Bird", img: "", lifespan: "15-20 years" },
  { id: 15, name: "Crocodile", type: "Reptile", img: "", lifespan: "70 years" },
  { id: 16, name: "Snake", type: "Reptile", img: "", lifespan: "15-30 years" },
  { id: 17, name: "Turtle", type: "Reptile", img: "", lifespan: "80-100 years" },
  { id: 18, name: "Frog", type: "Amphibian", img: "", lifespan: "10-15 years" },
  { id: 19, name: "Shark", type: "Fish", img: "", lifespan: "20-30 years" },
  { id: 20, name: "Dolphin", type: "Mammal", img: "", lifespan: "40-60 years" }
];

const cardsGrid = document.getElementById("cardsGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const typeFilter = document.getElementById("typeFilter");
const resetBtn = document.getElementById("resetBtn");
const resultCount = document.getElementById("resultCount");
const noResult = document.getElementById("noResult");

let likedIds = [];

// Filter select'ni turlar bilan to'ldirish
function fillTypeOptions() {
  const types = [...new Set(animals.map(animal => animal.type))];

  for (let i = 0; i < types.length; i++) {
    const option = document.createElement("option");
    option.value = types[i];
    option.textContent = types[i];
    typeFilter.appendChild(option);
  }
}

// Bitta card uchun HTML matn yasash
function createCardHTML(animal) {
  const isLiked = likedIds.includes(animal.id);
  const imgContent = animal.img
    ? `<img src="${animal.img}" alt="${animal.name}">`
    : `<span class="card-img-placeholder">rasm qo'shing</span>`;

  return `
    <div class="card-img">${imgContent}</div>
    <div class="card-info">
      <div class="card-top-row">
        <div>
          <div class="card-name">${animal.name}</div>
          <div class="card-sub">${animal.type}</div>
        </div>
        <span class="card-heart ${isLiked ? "liked" : ""}" data-id="${animal.id}">${isLiked ? "❤️" : "🤍"}</span>
      </div>
      <div class="card-stats">
        <span>⏳ ${animal.lifespan}</span>
      </div>
    </div>
  `;
}

// Array'ni for loop bilan aylanib, DOM'ga card qilib chiqarish
function renderAnimals(list) {
  cardsGrid.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    const animal = list[i];

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = createCardHTML(animal);

    cardsGrid.appendChild(card);
  }

  resultCount.textContent = `${list.length} ta hayvon topildi`;
  noResult.style.display = list.length === 0 ? "block" : "none";

  attachHeartEvents();
}

// Har bir card ichidagi yurak ikonkasiga event biriktirish
function attachHeartEvents() {
  const hearts = document.querySelectorAll(".card-heart");

  for (let i = 0; i < hearts.length; i++) {
    hearts[i].addEventListener("click", function () {
      const id = Number(this.dataset.id);

      if (likedIds.includes(id)) {
        likedIds = likedIds.filter(likedId => likedId !== id);
      } else {
        likedIds.push(id);
      }

      updateResults();
    });
  }
}

// Search + Filter + Sort birlashtirilgan natija
function updateResults() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedType = typeFilter.value;
  const sortValue = sortSelect.value;

  let result = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchValue);
    const matchesType = selectedType === "all" || animal.type === selectedType;
    return matchesSearch && matchesType;
  });

  if (sortValue === "nameAsc") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "nameDesc") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderAnimals(result);
}

// Eventlar
searchInput.addEventListener("keyup", updateResults);
sortSelect.addEventListener("change", updateResults);
typeFilter.addEventListener("change", updateResults);

resetBtn.addEventListener("click", function () {
  searchInput.value = "";
  sortSelect.value = "default";
  typeFilter.value = "all";
  updateResults();
});

// Boshlang'ich yuklash
fillTypeOptions();
updateResults();