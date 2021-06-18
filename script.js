const nameInput = document.querySelector('#name-input');
const matchUI = document.querySelector('.match-ui');
const startUI = document.querySelector('.start-ui');
const nameValue = document.querySelector('#name-value');
const genreInput = document.querySelector('#genre');
const displayMovie = document.querySelector('.display-movie');

// Hide 'match' UI

matchUI.classList.add('none');

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// Event listeners

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    document.querySelector('.loader').style.display = 'block';
    startUI.style.display = 'none';

    setTimeout(getMovies, 2000);
});

document.querySelector('.next-movie').addEventListener('click', getMovies)

document.querySelector('.change-cat').addEventListener('click', displayStartUI)

let genreID;

async function getMovies() {
    
    assignID();
    
    try {
        // Generate random page number
        const randomNumberPg = Math.floor(Math.random() * (50));
        
        const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=7391fe5e6a32318027103e00e3a6093e&with_genres=${genreID}&page=${randomNumberPg}&language=en-US`;
        
        // Make GET request to The Movie DB API
        const res = await fetch(APIURL);

        // Check if response is successful
        if(!res.ok) {
            // Throw error if response is not ok
            throw new Error(res.status);
        }
    
        // Convert response object to JSON
        const resData = await res.json()
        
        // Generate a random index number
        const randomNumber = Math.floor(Math.random() * (resData.results.length));

        // Hide loader
        document.querySelector('.loader').style.display = 'none'
        
        displayMatchUI();
        
        // Display random movie
        showMovie(resData.results[randomNumber]);

    } catch (error) {
        console.log(error)

        // Go back to the start if there is an error
        displayStartUI()
        
        // Hide loader
        document.querySelector('.loader').style.display = 'none';
        
        // Show error in UI
        const err = document.createElement('p');
        err.textContent = 'Something went wrong, try again!';
        err.classList.add('err-msg');
        document.querySelector('header').appendChild(err)

        // Remove error message after two seconds
        setTimeout(() => err.remove(), 3000)
    }
    
}

function showMovie(movie) {
    displayMovie.innerHTML = `
        <img
        src="${getPoster(IMGPATH, movie.poster_path)}"
        alt="${movie.title}"
        class="movie-poster"
        />
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p><strong>Vote average:</strong> ${movie.vote_average} ⭐</p>
            <p><strong>Year:</strong> ${getYear(movie.release_date)} 📅</p>
            <p class="overview" tabindex="0" role="document">${movie.overview}</p>
        </div>
    `;
}

function getYear(date) {
    const year = new Date(date);

    // If it's not a number just display '-'
    if(isNaN(year.getFullYear())) {
        return '-'
    } else {
        return year.getFullYear();
    }
}

function getPoster(imgPath, movie) {
    // If it doesn't have a poster display default poster image
    if (!movie) {
        return 'images/poster-404.png';
    } else {
        return imgPath + movie;
    }
}

// Depending on the input assign an ID

function assignID() {
    if (genreInput.value === 'Horror') {
        genreID = 27;
    } else if(genreInput.value === 'Action') {
        genreID = 28;
    } else if (genreInput.value === 'Animated') {
        genreID = 16;
    } else if(genreInput.value === 'Documentary') {
        genreID = 99;
    } else if (genreInput.value === 'Fantasy') {
        genreID = 14;
    } else if (genreInput.value === 'History') {
        genreID = 36;
    } else if (genreInput.value === 'Comedy') {
        genreID = 35;
    } else if (genreInput.value === 'Crime') {
        genreID = 80;
    } else if (genreInput.value === 'Mystery') {
        genreID = 9648;
    } else if (genreInput.value === 'Romance') {
        genreID = 10749;
    } else if (genreInput.value === 'Sci fi') {
        genreID = 878;
    }
}

function displayMatchUI() {
    nameValue.textContent = nameInput.value; 
    document.querySelector('#genre-value').textContent = genreInput.value;
    matchUI.classList.remove('none');
    startUI.style.display = 'none';
}

function displayStartUI() {
    matchUI.classList.add('none');
    startUI.style.display = 'block';
}