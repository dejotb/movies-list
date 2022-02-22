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
      const { info, ...otherProps } = movie;
      console.log(otherProps);
      let { getFormatedTitle } = movie;
      getFormatedTitle = getFormatedTitle.bind(movie);
      let html = `${getFormatedTitle()} - `;
      for (const key in info) {
        if (key != 'title') {
          html += `${key}: ${info[key]}`;
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
      getFormatedTitle() {
        return this.info.title.toUpperCase();
      },
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

  renderMovie(filterTitle);
};

searchMovieBtn.addEventListener('click', searchMovieHandler);
