const moviesEl = document.querySelector('.movies')
const resultEl = document.querySelector('.movies__search--wrapper')
const searchEl = document.querySelector('.search__icon')
const inputEl = document.querySelector('.movies__input')
const selectEl = document.querySelector('.filter')

let moviesArray;
let arrayFilter;
let search;

// oninput="movieSearch(this.value)"

/*
function movieSearch(val) {
    const input = val;
    searchResult(val);
    movieRender(val);
} */


function searchResult(val) {
    resultEl.innerHTML = `<h2 class="search__result">${val}</h2>`
}

async function movieRender(val) {
    search = val
    const movies = await fetch(`http://www.omdbapi.com/?s=${val}&apikey=a1d98b4f`)
    const moviesData = await movies.json();
    moviesArray = moviesData.Search
    arrayFilter = moviesData.Search
    
    const movieHTML = moviesArray.map((movie) => moviesHTML(movie)).join('');
    moviesEl.innerHTML = movieHTML;
}

function moviesHTML(movie) {
    return `<div class="movie">
        <img src="${movie.Poster}" alt="no movie img" class="movie__poster">
        <div class="movie__data">
            <h3 class="movie__title">${movie.Title}</h3>
            <h5 class="movie__year"><b>Year:</b>&nbsp;${movie.Year}</h5>
            <h5 class="movie__year"><b>Type:</b>&nbsp;${movie.Type}</h5>
        </div>
    </div>`
}

searchEl.addEventListener('click', () => {
    const input = inputEl.value
    searchResult(input);
    movieRender(input);
    inputEl.value = ''
})

inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const input = inputEl.value
        searchResult(input);
        movieRender(input);
        inputEl.value = ''
    }
})

function filterMovies(event) {
    const sort = event.target.value

    if (sort === 'NEW_TO_OLD') {
        arrayFilter.sort((a, b) => b.Year - a.Year)
        const movieHTML = arrayFilter.map((movie) => moviesHTML(movie)).join('');
        moviesEl.innerHTML = movieHTML;
    } else if (sort === 'OLD_TO_NEW') {
        arrayFilter.sort((a, b) => a.Year - b.Year)
        const movieHTML = arrayFilter.map((movie) => moviesHTML(movie)).join('');
        moviesEl.innerHTML = movieHTML;
    } else if (sort === 'START') {
        movieRender(search)
    }
}