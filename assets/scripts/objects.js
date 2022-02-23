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
      const { getFormatedTitle } = movie;
      let html = `${getFormatedTitle.call(movie)} - `;
      for (const key in info) {
        if (key != 'title' && key != '_title') {
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

  if (extraName.trim() === '' || extraValue.trim() === '') {
  } else {
    const newMovie = {
      info: {
        set title(val) {
          if (val.trim() === '') {
            this._title = 'default';
            return;
          }
          this._title = val;
        },
        get title() {
          return this._title.toUpperCase();
        },
        [extraName]: extraValue,
      },

      id: Math.floor(Math.random() * 1000),
      getFormatedTitle() {
        return this.info.title;
      },
    };

    newMovie.info.title = title;

    movies.push(newMovie);
    renderMovie();
  }

  document.querySelector('#title').value = '';
  document.querySelector('#extra-name').value = '';
  document.querySelector('#extra-value').value = '';
};

addMovieBtn.addEventListener('click', addMovieHandler);

const searchMovieHandler = function () {
  console.log(this);
  const filterTitle = document.querySelector('#filter-title').value;

  renderMovie(filterTitle);
};

searchMovieBtn.addEventListener('click', searchMovieHandler);

const members = {
  teamName: 'blue rockets',
  people: ['Max', 'Manuel'],
  getTeamMembers() {
    this.people.forEach((person) => {
      console.log(`${person} ${this.teamName}`);
    });
  },
};

members.getTeamMembers();
