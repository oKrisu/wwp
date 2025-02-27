const translations = {
	"pl": {
	  "title": "Interaktywna Strona",
	  "language-toggle": "Polski / English",
	  "font-size-toggle": "A+",
	  "theme-toggle": "🌙 / ☀️",
	  "info1": "Czym jest przesłuchanie dziecka?",
	  "info2": "Prawa i obowiązki dziecka podczas przesłuchania",
	  "find-room": "Znajdź swój pokój przesłuchań",
	  "victims": "Dla osób pokrzywdzonych przestępstwami na tle seksualnym",
	  "parents": "Dla rodziców/opiekunów przesłuchiwanych dzieci",
	  "city-label": "Wybierz swoje miasto:",
	  "address-label": "Adres:"
	},
	"en": {
	  "title": "Interactive Website",
	  "language-toggle": "English / Polski",
	  "font-size-toggle": "A+",
	  "theme-toggle": "🌙 / ☀️",
	  "info1": "What is child interrogation?",
	  "info2": "Rights and obligations of the child during the hearing",
	  "find-room": "Find your interrogation room",
	  "victims": "For victims of sexual crimes",
	  "parents": "For parents/guardians of questioned children",
	  "city-label": "Select your city:",
	  "address-label": "Address:"
	}
};

// Funkcja tłumaczenia strony
function translatePage(lang) {
	document.querySelectorAll("[data-translate]").forEach(element => {
	  const key = element.getAttribute("data-translate");
	  if (translations[lang][key]) {
		element.innerHTML = translations[lang][key];
	  }
	});
}

// Obsługa zmiany języka
document.getElementById('language-toggle').addEventListener('click', () => {
	const lang = document.documentElement.lang === "pl" ? "en" : "pl";
	document.documentElement.lang = lang;
	translatePage(lang);
});

// Obsługa zmiany czcionki
document.getElementById('font-size-toggle').addEventListener('click', () => {
	document.body.classList.toggle('large-font');
});

// Obsługa zmiany motywu jasny/ciemny
document.getElementById('theme-toggle').addEventListener('click', () => {
	document.body.classList.toggle('dark-theme');
});

// Funkcja dynamicznej zmiany treści po kliknięciu w zakładki
function showContent(section) {
	const contentArea = document.getElementById('content-area');

	const contentData = {
	  "info1": "<h2>Czym jest przesłuchanie dziecka?</h2><p>Przesłuchanie dziecka to proces, w którym...</p>",
	  "info2": "<h2>Prawa i obowiązki dziecka podczas przesłuchania</h2><p>Dziecko ma prawo do...</p>",
	  "find-room": `
		<h2 data-translate="find-room">Znajdź swój pokój przesłuchań</h2>
		<label for="city-select" data-translate="city-label" class="city-label">Wybierz swoje miasto:</label>
		<select id="city-select" class="city-select" onchange="showLocations()">
		  <option value="">-- Wybierz --</option>
		  <option value="warszawa">Warszawa</option>
		  <option value="krakow">Kraków</option>
		  <option value="gdansk">Gdańsk</option>
		</select>
		<div id="locations"></div>
	  `
	};

	// Jeśli sekcja istnieje w obiekcie contentData, wyświetlamy ją, w przeciwnym razie "Brak treści"
	contentArea.innerHTML = contentData[section] || "<p>Brak treści.</p>";
	translatePage(document.documentElement.lang);
}

// Funkcja wyświetlająca adresy po wyborze miasta
function showLocations() {
	const city = document.getElementById('city-select').value;
	const locationsDiv = document.getElementById('locations');

	const locations = {
	  "warszawa": ["ul. Marszałkowska 10, Warszawa"],
	  "krakow": ["ul. Grodzka 20, Kraków"],
	  "gdansk": ["ul. Długa 21, Gdańsk"]
	};

	locationsDiv.innerHTML = city in locations 
	  ? `<div class="city-address"><span data-translate="address-label">Adres:</span> ${locations[city][0]}</div>`
	  : "";
}
