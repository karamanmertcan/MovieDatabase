const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b4d9150daa32ba3c4f9356f39daaa7bf&page='
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=b4d9150daa32ba3c4f9356f39daaa7bf&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const mainContainer = document.getElementById('main')
const buttons = document.querySelectorAll('.btn')

buttons.forEach((button, idx) => {
  button.addEventListener('click', () => highlightbuttons(idx))
})

function highlightbuttons(idx) {
  const page = idx + 1

  if (page >= 2) {
    getMovies(API_URL + page)
  } else {
    window.location.reload()
  }

  buttons.forEach((button, idx2) => {
    if (idx2 == idx) {
      button.classList.add('full')
    } else {
      button.classList.remove('full')
    }
  })
}

// Show movies

const showMovies = (movies) => {
  mainContainer.innerHTML = ''

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie

    const html = `
    <div class="movie">
        <img
            src="${IMG_PATH + poster_path}" alt="${title}"
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    </div>

`

    mainContainer.insertAdjacentHTML('afterbegin', html)
  })
}

// GET INITIAL MOVIES
const getMovies = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)
}
getMovies(API_URL)

const getClassByRate = (vote) => {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)
    search.value = ''
  } else {
    window.location.reload()
  }
})

mybutton = document.getElementById('myBtn')

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction()
}

function scrollFunction() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    mybutton.style.display = 'block'
  } else {
    mybutton.style.display = 'none'
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0 // For Safari
  document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}
