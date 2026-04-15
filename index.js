const weatherApi = "https://api.weather.gov/alerts/active?area=";

const searchForm = document.querySelector("#search-form");
const stateInput = document.querySelector("#state-input");
const alertsDisplay = document.querySelector("#alerts-display");
const errorMessage = document.querySelector("#error-message");
const fetchButton = document.querySelector("#fetch-alerts");

function handleSearch(event) {
    if (event) event.preventDefault(); 
    const state = stateInput.value.trim().toUpperCase();

    if (state) {
        fetchWeatherData(state);
        stateInput.value = ""; 
    }
}

async function fetchWeatherData(state) {
    try {
        errorMessage.textContent = ""; 
        errorMessage.classList.add("hidden");
        alertsDisplay.innerHTML = "";

        const response = await fetch(`${weatherApi}${state}`);
        
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message); 
    }
}

function displayWeather(data) {
    const alerts = data.features;
    
    const countHeader = document.createElement("h2");
    countHeader.textContent = `Weather Alerts: ${alerts.length}`;
    alertsDisplay.appendChild(countHeader);

    alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        alertsDisplay.appendChild(p);
    });
}

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    alertsDisplay.innerHTML = ""; 
}


if (searchForm) {
    searchForm.addEventListener("submit", handleSearch);
}

if (fetchButton) {
    fetchButton.addEventListener("click", handleSearch);
}