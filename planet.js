document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planetId = urlParams.get('id');

    const planetNameElement = document.getElementById('planet-name');
    const planetInfoElement = document.getElementById('planet-info');

    // Fetch planet data from the provided URL
    fetch('https://swapi.online/api/planets')
        .then(response => response.json())
        .then(planets => {
            const planet = planets.find(p => p.id == planetId);

            if (planet) {
                planetNameElement.textContent = planet.name;
                planetInfoElement.innerHTML = `
                    <p><strong>Climate:</strong> ${planet.climate}</p>
                    <p><strong>Surface Water:</strong> ${planet.surface_water}%</p>
                    <p><strong>Diameter:</strong> ${planet.diameter} km</p>
                    <p><strong>Rotation Period:</strong> ${planet.rotation_period} hours</p>
                    <p><strong>Terrain:</strong> ${planet.terrain}</p>
                    <p><strong>Gravity:</strong> ${planet.gravity}</p>
                    <p><strong>Orbital Period:</strong> ${planet.orbital_period} days</p>
                    <p><strong>Population:</strong> ${planet.population}</p>
                `;
            } else {
                planetNameElement.textContent = "Planet not found";
            }
        })
        .catch(error => {
            console.error('Error fetching planet data:', error);
            planetNameElement.textContent = "Error loading planet data";
        });
});
