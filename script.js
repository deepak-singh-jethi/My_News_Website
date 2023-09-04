const api_key = "b2552a4cc47d475b85c7db4d8a0b7923";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => {
  fetchNews("india");
});

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${api_key}`);
  const data = await res.json();
  printnews(data.articles);
}

function printnews(articles) {
  const cardsContainer = document.getElementById("cards-conatiner");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.cloneNode(true);
    fillDataInCard(article, cardClone);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(article, cardClone) {
  const newsImage = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#new-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImage.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name}  .${date}`;
  cardClone.addEventListener("click", () => {
    window.open(article.url, "-blank");
  });
}

let currentSelectedNav = null;
function onNavItemClick(query) {
  fetchNews(query);
  const navItem = document.getElementById(query);
  currentSelectedNav?.classList.remove("active");
  currentSelectedNav = navItem;
  currentSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchtext = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  const qurery = searchtext.value;
  if (!qurery) return;
  fetchNews(qurery);
  currentSelectedNav?.classList.remove("active");
});

function reload() {
  window.location.reload();
}
