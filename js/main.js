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

function removeHorrorFilms(movieListInput) {
  var filteredMovieList = [];
  for (var i = 0; i < movieListInput.length; i++) {
    if (!movieListInput[i].genres.includes('Horror')) {
      filteredMovieList.push(Object.assign({}, movieListInput[i]));
    }
  }
  return filteredMovieList;
}

// todo modifiedMovieList.push(Object.assign({}, movieListInput[i])); Slice helyett

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
  var filteredMovieList = removeHorrorFilms(movieList);
  console.log(filteredMovieList);
}
getData('/json/top-rated-movies-01.json', successAjax);
