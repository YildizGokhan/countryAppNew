const searchInput = document.getElementById("search");
const searchDiv = document.getElementById("searchDiv");
const countriesContainer = document.querySelector(".countries");
countriesContainer.textContent = ""

window.addEventListener("load", () => {
    searchDiv.classList.add("visually-hidden");
});

const getData = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        getCountryInfo(data);
        searchInput.addEventListener("input", () => filterCountries(data));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


const getCountryInfo = (data) => {

    const countryList = document.createElement("span");
    countryList.className = 'list border border-2 rounded-2 p-1 role="bottom" ';
    countryList.textContent = data;
    searchDiv.appendChild(countryList);
};

const filterCountries = (data) => {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredCountries = data.filter(
        (country) => country.name.common.toLowerCase().includes(searchText)
    );

    if (filteredCountries.length > 1 && searchInput.value != "") {
        filteredCountries.forEach((country) => getCountryInfo(country.name.common));
    } else if (filteredCountries.length === 1) {
        displayCountryInfo(filteredCountries[0]);
        searchInput.textContent = "";
    } else {
        countriesContainer.innerHTML = "";
    }
}


const displayCountryInfo = (country) => {
    countriesContainer.innerHTML = `
    <div class="card shadow-lg" style="width: 22rem">
        <img src="${country.flags.png}" class="card-img-top shadow" alt="Flag" />
        <div>
            <h5 class="p-2 text-center">${country.name.common}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${country.region}
            </li>
            <li class="list-group-item">
                <i class="fas fa-lg fa-landmark"></i><span class="fw-bold"> Capitals:</span> ${country.capital}
            </li>
            <li class="list-group-item">
                <i class="fas fa-lg fa-comments"></i><span class="fw-bold"> Languages:</span> ${Object.values(country.languages)}
            </li>
            <li class="list-group-item">
                <i class="fas fa-lg fa-money-bill-wave"></i><span class="fw-bold"> Currencies:</span> ${country.currencies[Object.keys(country.currencies)[0]].name}, ${country.currencies[Object.keys(country.currencies)[0]].symbol}
            </li>
            <li class="list-group-item">
                <i class="fa-solid fa-people-group"></i><span class="fw-bold"> Population:</span> ${country.population.toLocaleString()}
            </li>
            <li class="list-group-item">
                <i class="fa-sharp fa-solid fa-road-barrier"></i><span class="fw-bold"> Borders:</span> ${country.borders || 'None'}
            </li>
            <li class="list-group-item">
                <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href="${country.maps.googleMaps}" target='_blank'> Go to Google Maps</a>
            </li>
        </ul>
    </div>`;
};

getData();
