const addMovieBtn = document.querySelector('#add-movie-btn');
const searchMovieBtn = document.querySelector('#search-btn');
const moviesList = document.querySelector('#movie-list');

const movies = [];

const renderMovie = function (filter = '') {
  if (movies.length === 0) {
    moviesList.classList.remove('visible');
  } else {
    moviesList.classList.add('visible');
    moviesList.innerHTML = '';

    const filteredMovies = !filter
      ? movies
      : movies.filter((movie) =>
          movie.info.title.toLowerCase().includes(filter.toLowerCase())
        );

    filteredMovies.forEach((movie) => {
      let html = `${movie.info.title} - `;
      for (const key in movie.info) {
        if (key != 'title') {
          html += `${key}: ${movie.info[key]}`;
        }
      }

      const text = `<li>${html}</li>`;

      moviesList.insertAdjacentHTML('beforeend', text);
    });
  }
};

const addMovieHandler = function () {
  const title = document.querySelector('#title').value;
  const extraName = document.querySelector('#extra-name').value;
  const extraValue = document.querySelector('#extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
  } else {
    const newMovie = {
      info: {
        title,
        [extraName]: extraValue,
      },
      id: Math.floor(Math.random() * 1000),
    };

    movies.push(newMovie);
    renderMovie();
  }

  document.querySelector('#title').value = '';
  document.querySelector('#extra-name').value = '';
  document.querySelector('#extra-value').value = '';
};

addMovieBtn.addEventListener('click', addMovieHandler);

const searchMovieHandler = function () {
  const filterTitle = document.querySelector('#filter-title').value;
  // const filteredMovies = movies.filter((movie) =>
  //   movie.info.title.toLowerCase().includes(filterTitle.toLowerCase())
  // );

  // console.log(filteredMovies);

  renderMovie(filterTitle);
};

searchMovieBtn.addEventListener('click', searchMovieHandler);
