const gifts = [
  {
    nom: "Figurine de Emilia",
    images: ["images/emilia.webp"],
    description: "Figurine de Emilia de Re:Zero, pas forcément celle la. Peut être d'occasion tant que c'est en bon état.",
    genre: "Figurine",
    desir: 3,
    prix: 40,
    liens: ["#"]
  },
  {
    nom: "Figurine de Rem",
    images: ["images/rem.jpg"],
    description: "Figurine de Rem de Re:Zero, pas forcément celle la. Peut être d'occasion tant que c'est en bon état.",
    genre: "Figurine",
    desir: 3,
    prix: 40,
    liens: ["#"]
  },
  {
    nom: "Vynile Mac Miller",
    images: ["images/kids.jpg", "images/Swimming.jpg"],
    description: "J'ai déjà the divine feminine et circles. Priorisez swimming et KIDS.",
    genre: "Musique",
    desir: 4,
    prix: 30,
    liens: ["https://www.fnac.com/a20709582/Mac-Miller-K-I-D-S-Edition-Limitee-Vinyle-Jaune-Translucide-Vinyle-album", "https://www.fnac.com/a12965302/Mac-Miller-Swimming-Vinyle-album"]
  },
  {
    nom: "Figurine de Ruby",
    images: ["images/ruby.jpg"],
    description: "Figurine de Ruby de Oshi no ko. Je veux forcément celle la. De la marque bampresto. Peut être d'occasion tant que c'est en bon état.",
    genre: "Figurine",
    desir: 5,
    prix: 40,
    liens: ["#"]
  },
  {
    nom: "Mangas",
    images: ["images/chi.gif"],
    description: "Pleins de mangas pour compléter mes collections. Mon lien ci dessous.",
    genre: "Livre",
    desir: 5,
    prix: 7,
    liens: ["https://www.mangacollec.com/user/gaspard18/collection"]
  },
  {
    nom: "De la moula",
    images: ["images/argent.jpg"],
    description: "Beaucoup.",
    genre: "Autre",
    desir: 1,
    prix: 4000000,
    liens: ["#"]
  },
];

// Élément principal de la liste
const giftList = document.getElementById("gift-list");

// Fonction d'affichage des cadeaux
function afficherCadeaux(data) {
  giftList.innerHTML = "";
  data.forEach(gift => {
    const card = document.createElement("div");
    card.className = "card";

    const imagesHTML = gift.images.map(image => `
      <img class="gift-image" src="${image}" alt="${gift.nom}">
    `).join("");

    card.innerHTML = `
      <div class="images">${imagesHTML}</div>
      <div class="card-content">
        <h2>${gift.nom}</h2>
        <p><strong>Description :</strong> ${gift.description}</p>
        <p><strong>Genre :</strong> ${gift.genre}</p>
        <p><strong>Désir :</strong> ${gift.desir} / 5</p>
        <p><strong>Prix :</strong> ${gift.prix} €</p>
        <div class="links">
          ${gift.liens
            .filter(lien => lien !== "#")
            .map(lien => `<a href="${lien}" target="_blank">Lien</a>`)
            .join("")}
        </div>

      </div>
    `;

    giftList.appendChild(card);
  });
}

// Affichage initial
afficherCadeaux(gifts);

// Gestion du pop-up d'accueil
window.onload = function () {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("popup-close");

  popup.style.display = "flex";

  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
};

// ----------------------------
// GESTION DES FILTRES (MODALE)
// ----------------------------

// Ouverture / fermeture de la modale
const openBtn = document.getElementById("open-filters");
const closeBtn = document.getElementById("close-filters");
const modal = document.getElementById("filter-modal");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Éléments de filtre
const genreFilter = document.getElementById("filter-genre");
const prixMinFilter = document.getElementById("filter-prix-min");
const prixMaxFilter = document.getElementById("filter-prix-max");
const desirMinFilter = document.getElementById("filter-desir-min");
const desirMaxFilter = document.getElementById("filter-desir-max");

function appliquerFiltres() {
  const genre = genreFilter.value;
  const prixMin = parseFloat(prixMinFilter.value);
  const prixMax = parseFloat(prixMaxFilter.value);
  const desirMin = parseInt(desirMinFilter.value);
  const desirMax = parseInt(desirMaxFilter.value);
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtres = gifts.filter(gift => {
    const matchGenre = genre === "" || gift.genre === genre;
    const matchDesir = (isNaN(desirMin) || gift.desir >= desirMin) &&
                       (isNaN(desirMax) || gift.desir <= desirMax);
    const matchSearch = gift.nom.toLowerCase().includes(searchTerm) ||
                        gift.description.toLowerCase().includes(searchTerm);

    // --- Gestion du prix ---
    let prixMinGift, prixMaxGift;

    if (typeof gift.prix === "string" && gift.prix.includes("-")) {
      const [minStr, maxStr] = gift.prix.split("-").map(p => p.trim());
      prixMinGift = parseFloat(minStr);
      prixMaxGift = parseFloat(maxStr);
    } else {
      prixMinGift = prixMaxGift = parseFloat(gift.prix);
    }

    const matchPrix = 
      (isNaN(prixMin) || prixMaxGift >= prixMin) &&
      (isNaN(prixMax) || prixMinGift <= prixMax);

    return matchGenre && matchPrix && matchDesir && matchSearch;
  });

  afficherCadeaux(filtres);
}



// Appliquer les filtres au clic sur bouton
document.getElementById("apply-filters").addEventListener("click", appliquerFiltres);

// Réinitialisation des filtres
document.getElementById("reset-filters").addEventListener("click", () => {
  genreFilter.value = "";
  prixMinFilter.value = "";
  prixMaxFilter.value = "";
  desirMinFilter.value = 1;
  desirMaxFilter.value = 5;
  afficherCadeaux(gifts);
});

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  appliquerFiltres(); // Réapplique les filtres à chaque saisie
});

function appliquerFiltres() {
  const genre = genreFilter.value;
  const prixMin = parseFloat(prixMinFilter.value);
  const prixMax = parseFloat(prixMaxFilter.value);
  const desirMin = parseInt(desirMinFilter.value);
  const desirMax = parseInt(desirMaxFilter.value);
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtres = gifts.filter(gift => {
    const matchGenre = genre === "" || gift.genre === genre;
    const matchPrix = (isNaN(prixMin) || gift.prix >= prixMin) &&
                      (isNaN(prixMax) || gift.prix <= prixMax);
    const matchDesir = (isNaN(desirMin) || gift.desir >= desirMin) &&
                       (isNaN(desirMax) || gift.desir <= desirMax);
    const matchSearch = gift.nom.toLowerCase().includes(searchTerm) ||
                        gift.description.toLowerCase().includes(searchTerm);

    return matchGenre && matchPrix && matchDesir && matchSearch;
  });

  afficherCadeaux(filtres);
}