import React from 'react';

export function useFixLoadMovies() {
  const [numberOfMovies, setNumberOfMovies] = React.useState(null);
  const [numberOfAddMovies, setNumberOfAddMovies] = React.useState(null);

  function checkScreenWidth (num) {
    if (num > 1280) {
      setNumberOfMovies(12)
      setNumberOfAddMovies(3)
    }
    else if ( num < 1280 && num > 500) {
      setNumberOfMovies(8)
      setNumberOfAddMovies(2)
    }
    else {
      setNumberOfMovies(5)
      setNumberOfAddMovies(5)
    }
  }

  function handleLoad (list, number) {
    const arr = []
    list.forEach((item) => {
      if (list.indexOf(item) < number) arr.push(item)
    })
    return arr
  };

  function filterMovies (list, type) {
    let isShort = localStorage.getItem(`isShort-${type}`)
    if (isShort === 'true') isShort = true
    else isShort = false
    const text = localStorage.getItem(`search-${type}`)
    const arr = []
    const regex = new RegExp(text, 'i');

    list.forEach((movie) => {
      if (!movie.country) movie.country = 'unknown'
      if (isShort) {
        if (regex.test(movie.nameRU) && movie.duration < 40) arr.push(movie)
      } else {
        if (regex.test(movie.nameRU)) arr.push(movie)
      }
    })
    localStorage.setItem(`resultSearch-${type}`, JSON.stringify(arr))
    return arr
  };

  function findSaveMovie (list, savedList, id) {
    if (!list || !savedList) return
    list.forEach(m => {
      const saved = savedList.find(i => i.id === m.movieId && i.nameRU === m.nameRU)
      if (saved) {
        m.owner = id
        m._id = saved._id
      }
      return m
    })

    return list
  }


  return { handleLoad, filterMovies, checkScreenWidth, findSaveMovie, numberOfMovies, numberOfAddMovies };
}
