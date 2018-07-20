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
  movieStatPoster.innerHTML = `<img src="/img/${chosentat.poster}" class="movie-poster">`;
  return movieStatPoster;
}

// ! 4-1

function selectRusselCroweMovies(originalMovieList) {
  var moviesRusselCrowe = [];
  for (var i = 0; i < originalMovieList.length; i++) {
    if (originalMovieList[i].actors.includes('Russell Crowe')) {
      moviesRusselCrowe.push(originalMovieList[i]);
    }
  }
  return moviesRusselCrowe;
}

function bubbleSortRussellCroweMoviesByYear(moviesRusselCrowe) {
  var change;
  var i = moviesRusselCrowe.length - 1;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (moviesRusselCrowe[j].year > moviesRusselCrowe[j + 1].year) {
        [moviesRusselCrowe[j], moviesRusselCrowe[j + 1]] = [moviesRusselCrowe[j + 1], moviesRusselCrowe[j]];
        change = j;
      }
    }
    i = change;
  }
  return moviesRusselCrowe;
}

// ! 4-2

function calculateAverageIMDBScoreOfOfAllMovies(originalMovieList) {
  var sum = 0;
  for (var i = 0; i < originalMovieList.length; i++) {
    sum += originalMovieList[i].imdbRating;
  }
  var avg = sum / originalMovieList.length;
  avg = avg.toFixed(1); // ? Így hasonlít a legjobban az IMDB pontszámhoz
  return avg;
}

// ! 4-3

function insertRussellCroweSuccessesIntoHTML(originalMovieList, targetDiv) {
  var moviesRusselCrowe = selectRusselCroweMovies(originalMovieList);
  bubbleSortRussellCroweMoviesByYear(moviesRusselCrowe);
  var moviesRussellCroweStat = createDivElementMovieStat();
  moviesRussellCroweStat.innerHTML = 'Russell Crowe made it to the top between';
  moviesRussellCroweStat.innerHTML += ` ${moviesRusselCrowe[0].year} and`;
  moviesRussellCroweStat.innerHTML += ` ${moviesRusselCrowe[moviesRusselCrowe.length - 1].year}.`;
  targetDiv.appendChild(moviesRussellCroweStat);
}

function insertAverageIMDBScoreIntoHTML(originalMoviesList, targetDiv) {
  var average = calculateAverageIMDBScoreOfOfAllMovies(originalMoviesList);
  var averageIMDBRatingStat = createDivElementMovieStat();
  averageIMDBRatingStat.innerHTML = `The average IMDB Score of the top 250 movies is ${average}.`;
  targetDiv.appendChild(averageIMDBRatingStat);
}

// ! 4-4
// ? A collectAllActorsOfMovies() és a collectAllGenresOfMovies() 95%-ban copy-paste, de
// ? nem találtam rá megoldást, hogyan tudnám a kulcs miatt egyesíteni őket egybe.
function collectAllActorsOfMovies(originalMovieList) {
  console.log(originalMovieList);
  var allActors = [];
  var actors = 'actors';
  for (var i = 0; i < originalMovieList.length; i++) {
    for (var j = 0; j < originalMovieList[i].actors.length; j++) {
      if (!allActors.includes(originalMovieList[i].actors[j])) {
        allActors.push(originalMovieList[i].actors[j]);
      }
    }
  }
  var allGenresMostOccasions = countOcasionsOfAll(originalMovieList, allActors, actors);
  console.log(allActors);
  console.log(allGenresMostOccasions);
}

// ! 4-5

function collectAllGenresOfMovies(originalMovieList) {
  var allGenres = [];
  var genres = 'genres';
  for (var i = 0; i < originalMovieList.length; i++) {
    for (var j = 0; j < originalMovieList[i].genres.length; j++) {
      if (!allGenres.includes(originalMovieList[i].genres[j])) {
        allGenres.push(originalMovieList[i].genres[j]);
      }
    }
  }
  var allGenresMostOccasions = countOcasionsOfAll(originalMovieList, allGenres, genres);
  console.log(allGenres);
  console.log(allGenresMostOccasions);
}

// ! 4-6

function collectYearsOfMovies(originalMovieList) {
  var allYears = [];
  var year = 'year';
  for (var i = 0; i < originalMovieList.length; i++) {
    if (!allYears.includes(originalMovieList[i].year)) {
      allYears.push(originalMovieList[i].year);
    }
  }
  var allYearsMostOccasions = countOcasionsOfAll(originalMovieList, allYears, year);
  console.log(allYearsMostOccasions);
  return allYearsMostOccasions;
}

// ? Tudom, hogy iszonyat hosszú és 3 loopos ez a függvény.
// ? Gondolkoztam, hogy szedjem ezt szét, de a cleancode szerint max 3 paramétert adhatnék meg.
function countOcasionsOfAll(originalMovieList, collectionInput, searchParameter) {
  var countActual = 0;
  var countBiggest = 0;
  var Top3 = [];
  for (var i = 0; i < collectionInput.length; i++) {
    for (var j = 0; j < originalMovieList.length; j++) {
      for (var k = 0; k < originalMovieList[j][searchParameter].length; k++) {
        if (collectionInput[i] === originalMovieList[j][searchParameter][k]) {
          countActual++;
        }
      }
    }
    if (countActual > countBiggest && Top3.length > 2) {
      countBiggest = countActual;
      countActual = 0;
      Top3.unshift(collectionInput[i]);
      Top3.pop();
    } else if (Top3.length < 3) {
      Top3.unshift(collectionInput[i]);
      countActual = 0;
    } else {
      countActual = 0;
    }
  }
  return Top3;
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
  var longestMovie = searchForLongestAndShortestMovies(filteredMovieList).longest;
  var moviesStats = document.querySelector('.movies-stats');
  createDivElementMovieStat();
  insertMovieStatsIntoHTML(movieJeremyIronsDrama1994, moviesStats);
  insertMovieStatsIntoHTML(shortestMovie, moviesStats);
  insertMovieStatsIntoHTML(longestMovie, moviesStats);
  insertRussellCroweSuccessesIntoHTML(movieList, moviesStats);
  insertAverageIMDBScoreIntoHTML(movieList, moviesStats);
  var top3Years = collectYearsOfMovies(movieList);
  var top3Genres = collectAllGenresOfMovies(movieList);
  var top3Actors = collectAllActorsOfMovies(movieList);
}
getData('/json/top-rated-movies-01.json', successAjax);
