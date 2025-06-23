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

async function getVehicle(id) {
    let vehicle;
    try {
        vehicle = await fetchVehicle(id)
        vehicle.drivers = await fetchDrivers(id)
      }
      catch (ex) {
        console.error(`Error reading character ${id} data.`, ex.message);
      }
      renderVehicle(vehicle);
}