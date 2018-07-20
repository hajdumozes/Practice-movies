// ! 1-1

function setOriginalTitleToTitle(movieListInput) {
  for (var i = 0; i < movieListInput.length; i++) {
    if (movieListInput[i].originalTitle.length > 0) {
      movieListInput[i].title = movieListInput[i].originalTitle;
    }
  }
  return movieListInput;
}

// ! 2-1

function removeHorrorMovies(movieListInput) {
  var filteredMovieList = [];
  for (var i = 0; i < movieListInput.length; i++) {
    if (!movieListInput[i].genres.includes('Horror')) {
      filteredMovieList.push(Object.assign({}, movieListInput[i]));
    }
  }
  return filteredMovieList;
}

// ! 2-2

function removeMoviesBefore1994(filteredMovieListInput) {
  for (var i = 0; i < filteredMovieListInput.length; i++) {
    if (filteredMovieListInput[i].releaseDate < '1994-10-23') {
      filteredMovieListInput.splice(i, 1);
      i--;
    }
  }
}

// ! 2-3

function deleteAdditionalKeys(filteredMovieListInput) {
  for (var i = 0; i < filteredMovieListInput.length; i++) {
    delete filteredMovieListInput[i].averageRating;
    delete filteredMovieListInput[i].contentRating;
    delete filteredMovieListInput[i].originalTitle;
    delete filteredMovieListInput[i].posterurl;
    delete filteredMovieListInput[i].ratings;
    delete filteredMovieListInput[i].releaseDate;
  }
}

// ! 3-1

function searchForJeremyIrons1994DramaMovie(filteredMovieList) {
  var result = {}; // ? mivel kiderült, hogy csak egy van, nem pusholok.
  for (var i = 0; i < filteredMovieList.length; i++) {
    if (filteredMovieList[i].actors.includes('Jeremy Irons') &&
      filteredMovieList[i].year === '1994' &&
      filteredMovieList[i].genres.includes('Drama')) {
      result = (filteredMovieList[i]);
    }
  }
  return result;
}

// ! 3-2

function searchForLongestAndShortestMovies(filteredMovieList) {
  var shortest = filteredMovieList[0];
  var longest = filteredMovieList[0];
  for (var i = 1; i < filteredMovieList.length; i++) { // ? Duration example: PT142M
    longest = searchForLongestMovie(filteredMovieList, longest, i);
    shortest = searchForShortestMovie(filteredMovieList, shortest, i);
  }
  return {
    shortest: shortest,
    longest: longest
  };
}

function searchForLongestMovie(filteredMovieList, longest, i) {
  if (parseInt(filteredMovieList[i].duration.slice(2), 10) >
    parseInt(longest.duration.slice(2), 10)) { // ? A parseInt 142M-re is működik
    return filteredMovieList[i];
  }
  return longest;
}

function searchForShortestMovie(filteredMovieList, shortest, i) {
  if (parseInt(filteredMovieList[i].duration.slice(2), 10) <
    parseInt(shortest.duration.slice(2), 10)) {
    return filteredMovieList[i];
  }
  return shortest;
}

// ! 3-3

function createDivElementMovieStat() {
  var movieStat = document.createElement('div');
  movieStat.className = 'movie-stat';
  return movieStat;
}

function createDivElementMovieStatTitle() {
  var movieStatTitle = document.createElement('div');
  movieStatTitle.className = 'movie-stat-title';
  return movieStatTitle;
}

function createDivElementMovieStatStoryline() {
  var movieStatStoryLine = document.createElement('div');
  movieStatStoryLine.className = 'movie-stat-storyline';
  return movieStatStoryLine;
}

function createDivElementMovieStatPoster() {
  var movieStatPoster = document.createElement('div');
  movieStatPoster.className = 'movie-stat-poster';
  return movieStatPoster;
}

function insertMovieStatsIntoHTML(chosenStat, selectedDiv) {
  var movieStat = createDivElementMovieStat();
  movieStat.appendChild(insertMovieStatTitleAndYear(chosenStat));
  movieStat.appendChild(insertMovieStatStoryLine(chosenStat));
  movieStat.appendChild(insertMovieStatPoster(chosenStat));
  selectedDiv.appendChild(movieStat);
}

function insertMovieStatTitleAndYear(chosenStat) {
  var movieStatTitle = createDivElementMovieStatTitle();
  movieStatTitle.innerHTML = `${chosenStat.title} (${chosenStat.year})`;
  return movieStatTitle;
}

function insertMovieStatStoryLine(chosenStat) {
  var movieStatStoryLine = createDivElementMovieStatStoryline();
  movieStatStoryLine.innerHTML = `${chosenStat.storyline}`;
  return movieStatStoryLine;
}

function insertMovieStatPoster(chosentat) {
  var movieStatPoster = createDivElementMovieStatPoster();
  movieStatPoster.innerHTML = `<img src="/img/${chosentat.poster}">`;
  return movieStatPoster;
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function xhttpState() {
    // ? ide belenyúltam az ESLINT miatt, 2 == helyett 3 === lett.
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var movieList = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  setOriginalTitleToTitle(movieList);
  var filteredMovieList = removeHorrorMovies(movieList);
  removeMoviesBefore1994(filteredMovieList);
  deleteAdditionalKeys(filteredMovieList);
  var movieJeremyIronsDrama1994 = searchForJeremyIrons1994DramaMovie(filteredMovieList);
  var shortestMovie = searchForLongestAndShortestMovies(filteredMovieList).shortest;
  console.log(movieJeremyIronsDrama1994);
  var longestMovie = searchForLongestAndShortestMovies(filteredMovieList).longest;
  var moviesStats = document.querySelector('.movies-stats');
  createDivElementMovieStat();
  insertMovieStatsIntoHTML(movieJeremyIronsDrama1994, moviesStats);
  insertMovieStatsIntoHTML(shortestMovie, moviesStats);
  insertMovieStatsIntoHTML(longestMovie, moviesStats);
}
getData('/json/top-rated-movies-01.json', successAjax);
