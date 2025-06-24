let title;
let producer;
let episode;
let director;
let release_date;
let opening_crawl;

let planetsUl;
let vehiclesUl;
let speciesUl;
let starshipsUl;

const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  title = document.querySelector("h1#title");
  producer = document.querySelector("span#producer");
  episode = document.querySelector("span#episode");
  director = document.querySelector("span#director");
  release_date = document.querySelector("span#release_date");
  opening_crawl = document.querySelector("span#opening_crawl");

  planetsUl = document.querySelector("#planets>ul");
  vehiclesUl = document.querySelector("#vehicles>ul");
  speciesUl = document.querySelector("#species>ul");
  starshipsUl = document.querySelector("#starships>ul");

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    film.planets = await fetchPlanets(id);
    film.vehicles = await fetchVehicles(id);
    film.species = await fetchSpecies(id);
    film.starships = await fetchStarships(id);
  } catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderFilm(film);
}

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl).then((res) => res.json());
}

async function fetchPlanets(id) {
  const url = `${baseUrl}/films/${id}/planets`;
  const planets = await fetch(url).then((res) => res.json());
  return planets;
}

async function fetchVehicles(id) {
  const url = `${baseUrl}/films/${id}/vehicles`;
  const vehicles = await fetch(url).then((res) => res.json());
  return vehicles;
}

async function fetchSpecies(id) {
  const url = `${baseUrl}/films/${id}/species`;
  const species = await fetch(url).then((res) => res.json());
  return species;
}

async function fetchStarships(id) {
  const url = `${baseUrl}/films/${id}/starships`;
  const starships = await fetch(url).then((res) => res.json());
  return starships;
}

const renderFilm = (film) => {
  document.title = `SWAPI - ${film?.title}`;

  title.textContent = film?.title;
  producer.textContent = film?.producer;
  episode.textContent = film?.episode_id;
  director.textContent = film?.director;
  release_date.textContent = film?.release_date;
  opening_crawl.textContent = film?.opening_crawl;

  const planetsList = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`);
  planetsUl.innerHTML = planetsList.join("");

  const vehiclesList = film?.vehicles?.map(vehicles => `<li><a href="/vehicle.html?id=${vehicles.id}">${vehicles.name}</li>`);
  vehiclesUl.innerHTML = vehiclesList.join("");

  const speciesList = film?.species?.map(species => `<li><a href="/species.html?id=${species.id}">${species.name}</li>`);
  speciesUl.innerHTML = speciesList.join("");

  const starshipsList = film?.starships?.map(starships => `<li><a href="/starships.html?id=${starships.id}">${starships.name}</li>`);
  starshipsUl.innerHTML = starshipsList.join("");
};
