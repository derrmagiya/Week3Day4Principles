const apiKey = 'remeber to put api key'; 

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieDetailsContainer = document.getElementById('movieDetails');

async function fetchMovieDetails(movieTitle) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results[0]; 
        console.error('Error fetching movie details:', error);
        return null;
    }
}

function displayMovieDetails(movie) {
    if (!movie) {
        movieDetailsContainer.innerHTML = '<p>No movie found.</p>';
        return;
    }

    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const html = `
        <h2>${movie.title}</h2>
        <img src="${imageUrl}" alt="${movie.title}">
        <p>${movie.overview}</p>
        <p>Release Date: ${movie.release_date}</p>
        <p>Rating: ${movie.vote_average}</p>
    `;

    movieDetailsContainer.innerHTML = html;
}

async function handleSearchClick() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        return;
    }

    const movie = await fetchMovieDetails(searchTerm);
    displayMovieDetails(movie);
}

searchButton.addEventListener('click', handleSearchClick);