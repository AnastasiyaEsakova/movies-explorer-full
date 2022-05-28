import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import './SearchForm.css';

function SearchForm(props) {
  const [movie, setMovie] = React.useState("");
  const [isShort, setIsShort] = React.useState(false);
  const { handleChange, isValid, setIsValid} = useFormAndValidation()
  const ls = localStorage

  React.useEffect(() => {
    let isShort = ls.getItem(`isShort-${props.type}`)
    if (isShort === 'true') setIsShort(true)
    else setIsShort(false)
    setMovie( ls.getItem(`search-${props.type}`) || '');
    setIsValid(true)
  }, [])

  React.useEffect(() => {
    if (movie) {
      ls.setItem(`search-${props.type}`, movie)
      ls.setItem(`isShort-${props.type}`, isShort)
      props.handleSearchMovies(props.type)
    }
  }, [isShort])

  const handleChangeMovie = (e) => {
    setMovie(e.target.value)
    handleChange(e)
  }
  const handleChangeCheckbox = () => {
    if (isShort) setIsShort(false);
    else setIsShort(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    ls.setItem(`isShort-${props.type}`, isShort)
    ls.setItem(`search-${props.type}`, movie)
    props.handleSearchMovies(props.type)
  }

  return (
    <div className="search-form">
      <div className={`search-form__container ${isValid ? 'search-form__container_active' : '' }`}>
      <form className="search-form__box" onSubmit={handleSubmit}>
        <div className="search-form__img-search"></div>
        <input type="text" className="search-form__input" placeholder="Фильм" required value={movie || ''} onChange={handleChangeMovie}/>
        <button className="search-form__button">
          <div className="search-form__button-search"></div>
        </button>
        <div className="search-form__line"></div>
        <label className="search-form__checkbox-container">
          <input className="search-form__checkbox" type="checkbox" value={isShort} onChange={handleChangeCheckbox} checked={isShort} />
          <span className="search-form__span"></span>
          Короткометражки
        </label>
      </form>
      <span className={`search-form__error ${!isValid ? 'search-form__error_active' : ''}`}>Заполните это поле</span>
      <label className="search-form__checkbox-container search-form__checkbox-container_type_mobile">
          <input className="search-form__checkbox" type="checkbox" value={isShort} onChange={handleChangeCheckbox} checked={isShort}/>
          <span className="search-form__span"></span>
          Короткометражки
        </label>
      </div>
    </div>


  );
}

export default SearchForm;
