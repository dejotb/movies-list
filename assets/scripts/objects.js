const addMovieBtn = document.querySelector('#add-movie-btn');
const searchMovieBtn = document.querySelector('#search-btn');

const movies = [];

const addMovieHandler = function () {
  const title = document.querySelector('#title').value;
  const extraName = document.querySelector('#extra-name').value;
  const extraValue = document.querySelector('#extra-value').value;

  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    console.log('empty field');
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.floor(Math.random() * 1000),
  };

  movies.push(newMovie);
  console.log(movies);
};

addMovieBtn.addEventListener('click', addMovieHandler);
