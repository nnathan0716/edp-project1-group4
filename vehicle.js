let nameH1;
let drivers;
const baseUrl = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    drivers = document.querySelector('#drivers>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    console.log(id)
    getVehicle(id)
});

// Get all data from APi
async function getVehicle(id) {
    let vehicle;
    try {
        vehicle = await fetchVehicle(id)
        vehicle.drivers = await fetchDrivers(id)
        console.log(vehicle)
        console.log(vehicle.drivers)
    }
    catch (ex) {
        console.error(`Error reading character ${id} data.`, ex.message);
    }
        renderVehicle(vehicle);
}

// Functions for fetching API data
async function fetchVehicle(id) {
    let vehicleUrl = `${baseUrl}/vehicles/${id}`;
    return await fetch(vehicleUrl)
      .then(res => res.json())
}
async function fetchDrivers(id) {
    let driverUrl = `${baseUrl}/vehicles/${id}/characters`;
    return await fetch(driverUrl)
      .then(res => res.json())
}

// Rendering data
const renderVehicle = vehicle => {
    document.title = `SWAPI - ${vehicle?.vehicle_class}`;  // Just to make the browser tab say their name (yoinked from character.js, didn't know you could do this)
    nameH1.textContent = `Vehicle Name: ${vehicle?.vehicle_class}`
    const driversList = vehicle?.drivers?.map(driver => `<li><a href="/character.html?id=${driver.id}">${driver.name}</li>`)
    console.log(drivers)
    drivers.innerHTML = driversList.join("");
}