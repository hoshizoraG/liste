const gifts = [
  {
    nom: "Mangas",
    images: ["images/chi.gif"],
    description: "Pleins de mangas pour compléter mes collections. Privilegiez des séries où il me reste peu de tomes à avoir. Mon lien ci dessous. Peuvent être d'occasion ( ça m'en ferai plus :b ) mais verifiez bien l'état avant d'acheter svp. ( pas de tranches jaunies, pages cornées, couvertures abimées, etiquettes collées etc... )",
    genre: "Livre",
    desir: 5,
    prix: 7,
    liens: ["https://www.mangacollec.com/user/gaspard18/collection"]
  },
  {
    nom: "De la moula",
    images: ["images/argent.jpg"],
    description: "Pour payer ma vie entre autres.",
    genre: "Autre",
    desir: 5,
    prix: 4000000,
    liens: ["#"]
  },
  {
    nom: "Un cuiseur de riz",
    images: ["images/riz.webp"],
    description: "Je ne sais pas quel modèle, je n'y connais rien. Tant qu'il marche je serai content je pense.",
    genre: "Autre",
    desir: 4,
    prix: 50,
    liens: ["#"]
  },
  {
    nom: "Carte Cadeau Celio",
    images: ["images/celio.jpg"],
    description: "Rien à dire de plus si ce n'est que je suis heureux.",
    genre: "Vetement",
    desir: 3,
    prix: "beaucoup d'",
    liens: ["#"]
  },
  {
    nom: " Une petite tuture ",
    images: ["images/subaru.webp"],
    description: "Une veritabe Subaru impreza wrx sti 4 cylindres en ligne turbo 300ch. En boite manuelle bien sur.",
    genre: "Blague",
    desir: 5,
    prix: 30000,
    liens: ["#"]
  },
  {
    nom: " Un PC",
    images: ["images/pc.jpg"],
    description: "Un pc un minimum performant et pas trop vieux non plus. C'est pas pour jouer donc pas besoin d'y mettre des milles et des cents. Il peut meme etre d'occasion tant qu'il marche bien.",
    genre: "Informatique",
    desir: 4,
    prix: undefined,
    liens: ["#"]
  },
  {
    nom: "Intégrale du manga Citrus",
    images: ["images/citrus.jpg"],
    description: "Il y a 2 packs, un du tome 1 à 5 et un du tome 6 à 10. Je veux les deux. Ils sortent le 21 novembre.",
    genre: "Livre",
    desir: 5,
    prix: 50,
    liens: ["https://www.fnac.com/a21723847/Citrus-Pack-T01-a-T05-Citrus-Saburouta","https://www.fnac.com/a21723848/Citrus-Pack-T06-a-T10-Citrus-Saburouta"]
  },
  {
    nom: "Tome 6 de 86",
    images: ["images/86.jpg"],
    description: "Le tome 6 du Light Novel de 86 eighty six. C'est bien le Light novel pas le manga. Il sort le 5 décembre.",
    genre: "Livre",
    desir: 4,
    prix: 15.50,
    liens: ["https://www.fnac.com/a21723819/86-Eighty-Six-86-Eighty-Six-Tome-06-Asato-Asato"]
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
