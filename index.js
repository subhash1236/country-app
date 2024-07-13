document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries';
    const countryCards = document.getElementById('country-cards');
    const sortAscBtn = document.getElementById('sort-asc');
    const sortDescBtn = document.getElementById('sort-desc');
  
    const fetchCountries = async (sortOrder = 'asc') => {
      try {
        const response = await fetch(`${API_URL}?sort=population&order=${sortOrder}`);
        const data = await response.json();
        displayCountries(data.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
  
    const displayCountries = (countries) => {
      countryCards.innerHTML = '';
      countries.forEach(country => {
        const { name, population, capital, region } = country;
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        countryCard.innerHTML = `
          <h2>${name || 'N/A'}</h2>
          <p><strong>Population:</strong> ${population !== undefined ? population : 'N/A'}</p>
          <p><strong>Capital:</strong> ${capital || 'N/A'}</p>
          <p><strong>Region:</strong> ${region || 'N/A'}</p>
        `;
        countryCards.appendChild(countryCard);
      });
    };
  
    sortAscBtn.addEventListener('click', () => fetchCountries('asc'));
    sortDescBtn.addEventListener('click', () => fetchCountries('desc'));
  
    // Initial fetch with default sort order (asc)
    fetchCountries();
  });
  