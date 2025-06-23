let title;
let producer;
let episode;
let director;
let release_date;
let opening_crawl;

let planetsDiv;
let vehiclesDiv;
let speciesDiv;
let starshipsDiv;

const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  title = document.querySelector('h1#title');
  producer = document.querySelector('span#producer');
  episode = document.querySelector('span#episode');
  director = document.querySelector('span#director');
  release_date = document.querySelector('span#release_date');
  opening_crawl = document.querySelector('span#opening_crawl');
  
  planetsUl = document.querySelector('#films>ul');
  vehiclesUl = document.querySelector('#films>ul');
  speciesUl = document.querySelector('#films>ul');
  starshipsUl = document.querySelector('#films>ul');

  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.planets = await fetchPlanets(id)
    film.vehicles = await fetchVehicles(id)
    film.species = await fetchSpecies(id)
    film.starships = await fetchStarships(id)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderFilm(character);
}

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(characterUrl)
    .then(res => res.json())
}

async function fetchHomeworld(character) {
  const url = `${baseUrl}/planets/${character?.homeworld}`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}

async function fetchFilms(character) {
  const url = `${baseUrl}/characters/${character?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderCharacter = character => {
  document.title = `SWAPI - ${character?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = character?.name;
  heightSpan.textContent = character?.height;
  massSpan.textContent = character?.mass;
  birthYearSpan.textContent = character?.birth_year;
  homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
}
