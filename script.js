const startBtn = document.querySelector('#start-btn');
const nameInput = document.querySelector('#name-input');
const matchUI = document.querySelector('#match-ui');
const startUI = document.querySelector('.start-ui');
const nameValue = document.querySelector('#name-value');
const genreInput = document.querySelector('#genre');
const displayMovie = document.querySelector('.display-movie');

matchUI.classList.add('none');

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// Movie API

document.querySelector('form').addEventListener('submit', getMovies);
document.querySelector('.next-movie').addEventListener('click', getMovies)

let genreID;

async function getMovies(e) {
    
    e.preventDefault();

    // Finish adding all the genres, probably using a switch statement
    // Add the options to the form
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
    
    const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&with_genres=${genreID}`;
    
    const res = await fetch(APIURL);
    const resData = await res.json();

    console.log(resData)

    const randomNumber = Math.floor(Math.random() * (resData.results.length));

    // Here it should display the loader
    
    displayMatchUI();
    
    showMovie(resData.results[randomNumber]);
}

function showMovie(movie) {
    displayMovie.innerHTML = `
        <img
        src="${IMGPATH + movie.poster_path}"
        alt="${movie.title}"
        class="movie-poster"
        />
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
        </div>
    `;
}

function displayMatchUI() {
    nameValue.textContent = nameInput.value; 
    document.querySelector('#genre-value').textContent = genreInput.value;
    matchUI.classList.remove('none');
    startUI.style.display = 'none';
}