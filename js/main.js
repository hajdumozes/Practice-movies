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

function bubbleSortDescending(moviesRusselCrowe, sortByValue) {
  var change;
  var i = moviesRusselCrowe.length - 1;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (moviesRusselCrowe[j][sortByValue] < moviesRusselCrowe[j + 1][sortByValue]) {
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
  var sortByYear = 'year';
  bubbleSortDescending(moviesRusselCrowe, sortByYear);
  var moviesRussellCroweStat = createDivElementMovieStat();
  moviesRussellCroweStat.innerHTML = 'Russell Crowe made it to the top between';
  moviesRussellCroweStat.innerHTML += ` ${moviesRusselCrowe[moviesRusselCrowe.length - 1].year} and`;
  moviesRussellCroweStat.innerHTML += ` ${moviesRusselCrowe[0].year}.`;
  targetDiv.appendChild(moviesRussellCroweStat);
}

function insertAverageIMDBScoreIntoHTML(originalMoviesList, targetDiv) {
  var average = calculateAverageIMDBScoreOfOfAllMovies(originalMoviesList);
  var averageIMDBRatingStat = createDivElementMovieStat();
  averageIMDBRatingStat.innerHTML = `The average IMDB Score of the top 250 movies is ${average}.`;
  targetDiv.appendChild(averageIMDBRatingStat);
}

// ! 4-4 && 4-5
function collectAllActorsOrGenresOfMovies(originalMovieList, actorsOrGenresParameter) {
  var allActorsOrGenresArray = [];
  for (var i = 0; i < originalMovieList.length; i++) {
    for (var j = 0; j < originalMovieList[i][actorsOrGenresParameter].length; j++) {
      if (!allActorsOrGenresArray.includes(originalMovieList[i][actorsOrGenresParameter][j])) {
        allActorsOrGenresArray.push(originalMovieList[i][actorsOrGenresParameter][j]);
      }
    }
  }
  var allGenresMostOccasions = countOcasionsOfAllActorsOrGenres(originalMovieList,
    allActorsOrGenresArray, actorsOrGenresParameter);
  return allGenresMostOccasions;
}


// ! 4-6

function collectYearsOfMovies(originalMovieList) {
  var allYears = [];
  for (var i = 0; i < originalMovieList.length; i++) {
    if (!allYears.includes(originalMovieList[i].year)) {
      allYears.push(originalMovieList[i].year);
    }
  }
  var allYearsMostOccasions = countOcasionsOfAllYears(originalMovieList, allYears);
  return allYearsMostOccasions;
}

// ? Tudom, hogy iszonyat hosszú és 3 loopos ez a függvény. Ráadásul 2x szerepel az évek miatt.
// ? Gondolkoztam, hogy szedjem ezt szét, de a cleancode szerint max 3 paramétert adhatnék meg.
function countOcasionsOfAllActorsOrGenres(originalMovieList, collectionInput, searchParameter) {
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

function countOcasionsOfAllYears(originalMovieList, collectionInput) {
  var countActual = 0;
  var countBiggest = 0;
  var Top3 = [];
  for (var i = 0; i < collectionInput.length; i++) {
    for (var j = 0; j < originalMovieList.length; j++) {
      if (collectionInput[i] === originalMovieList[j].year) {
        countActual++;
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

// ! 4-7

function createMedalPedestal(mainSection, top3Position) {
  var medalDiv = insertMedalPedestalImage();
  createFirstPositionDiv(top3Position, medalDiv);
  createSecondPositionDiv(top3Position, medalDiv);
  createThirdPositionDiv(top3Position, medalDiv);
  mainSection.appendChild(medalDiv);
}

function insertMedalPedestalImage() {
  var medalDiv = createDivElementMovieStat();
  medalDiv.className = 'pedestal';
  var medalImage = document.createElement('img');
  medalImage.src = '/img/medal-pedestal.png';
  medalDiv.appendChild(medalImage);
  return medalDiv;
}

function createFirstPositionDiv(top3Position, medalDiv) {
  var first = createDivElementMovieStat();
  first.innerHTML = `${top3Position[0]}`;
  first.className = 'movie-stat-title';
  first.classList.add('firstPosition');
  addAdditionalClasses(top3Position, first);
  medalDiv.appendChild(first);
}

function addAdditionalClasses(top3Position, position) {
  addClassNameActor(top3Position, position);
  addClassNameYear(top3Position, position);
  addClassNameGenre(top3Position, position);
}

function addClassNameActor(top3Position, position) {
  if (top3Position[0][0] === 'R') {
    position.classList.add('actorPosition');
  }
}

function addClassNameYear(top3Position, position) {
  if (top3Position[0][0] === '1') {
    position.classList.add('yearPosition');
  }
}

function addClassNameGenre(top3Position, position) {
  if (top3Position[0][0] === 'A') {
    position.classList.add('genrePosition');
  }
}

function createSecondPositionDiv(top3Position, medalDiv) {
  var second = createDivElementMovieStat();
  second.innerHTML = `${top3Position[1]}`;
  second.className = 'movie-stat-title';
  second.classList.add('secondPosition');
  addAdditionalClasses(top3Position, second);
  medalDiv.appendChild(second);
}

function createThirdPositionDiv(top3Position, medalDiv) {
  var third = createDivElementMovieStat();
  third.innerHTML = `${top3Position[2]}`;
  third.className = 'movie-stat-title';
  third.classList.add('thirdPosition');
  addAdditionalClasses(top3Position, third);
  medalDiv.appendChild(third);
}

// ! 5

function activateSearch(filteredMovieList) {
  var searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', function event() {
    searchForYear(filteredMovieList);
  });
}

function searchForYear(filteredMovieList) {
  var sortByIMDB = 'imdbRating';
  bubbleSortDescending(filteredMovieList, sortByIMDB);
  searchForYearWhile(filteredMovieList);
}

function searchForYearWhile(filteredMovieList) {
  var searchedYear = document.querySelector('#search-text').value;
  var found = false;
  var i = 0;
  while (i < filteredMovieList.length && !found) {
    if (searchedYear === filteredMovieList[i].year) {
      found = true;
      var foundMovie = createOutputTemplate(filteredMovieList[i]);
      var objectofFoundYearPoster = document.createElement('img');
      objectofFoundYearPoster.src = `/img/${filteredMovieList[i].poster}`;
    }
    i++;
  }
  displayAfterSearch(foundMovie, objectofFoundYearPoster, found);
}

function displayAfterSearch(foundMovie, objectofFoundYearPoster, found) {
  var targetDiv = document.querySelector('.one-movie');
  if (found) {
    ifFoundTasks(foundMovie, objectofFoundYearPoster, targetDiv);
  } else {
    ifNotFoundTasks(targetDiv);
  }
}

function ifFoundTasks(foundMovie, objectofFoundYearPoster, targetDiv) {
  deletePreviousSideDiv(targetDiv);
  var resultDiv = createResultDivForSearch();
  fillResultDivIfFound(resultDiv, foundMovie, objectofFoundYearPoster, targetDiv);
}

function ifNotFoundTasks(targetDiv) {
  deletePreviousSideDiv(targetDiv);
  var resultDiv = createResultDivForSearch();
  fillResultDivIfNotFound(resultDiv, targetDiv);
}

function createResultDivForSearch() {
  var resultDiv = createDivElementMovieStat();
  resultDiv.className = 'one-movie-result';
  resultDiv.id = 'div-to-delete';
  return resultDiv;
}

function deletePreviousSideDiv(targetDiv) {
  if (document.querySelector('#div-to-delete')) {
    var divToDelete = document.querySelector('#div-to-delete');
    targetDiv.removeChild(divToDelete);
  }
}

function fillResultDivIfFound(resultDiv, foundMovie, objectofFoundYearPoster, targetDiv) {
  resultDiv.innerHTML = foundMovie;
  resultDiv.appendChild(objectofFoundYearPoster);
  targetDiv.appendChild(resultDiv);
}

function fillResultDivIfNotFound(resultDiv, targetDiv) {
  var notFoundImage = document.createElement('img');
  notFoundImage.src = '/img/not-found.png';
  resultDiv.appendChild(notFoundImage);
  targetDiv.appendChild(resultDiv);
}

function createOutputTemplate(objectOfFoundYear) {
  var outputTemplate = '';
  for (var k in objectOfFoundYear) {
    if (objectOfFoundYear.hasOwnProperty(k) && k !== 'poster' && k !== 'storyline') {
      outputTemplate += `${k}: ${objectOfFoundYear[k]} <br>`;
    }
  }
  return outputTemplate;
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
  var genres = 'genres';
  var actors = 'actors';
  var top3Years = collectYearsOfMovies(movieList);
  var top3Genres = collectAllActorsOrGenresOfMovies(movieList, genres);
  var top3Actors = collectAllActorsOrGenresOfMovies(movieList, actors);
  createMedalPedestal(moviesStats, top3Years);
  createMedalPedestal(moviesStats, top3Genres);
  createMedalPedestal(moviesStats, top3Actors);
  activateSearch(filteredMovieList);
}
getData('/json/top-rated-movies-01.json', successAjax);
