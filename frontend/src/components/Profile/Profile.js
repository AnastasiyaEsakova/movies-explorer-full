import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import './Profile.css'

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { handleChange, errors, isValid, setIsValid} = useFormAndValidation()
  const [isEdit, setisEdit] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setIsValid(false)
    setName(currentUser.data?.name || '');
    setEmail(currentUser.data?.email || '');
    setisEdit(false)
  }, [currentUser])

  const handleChangeName = (e) => {
    if (e.target.value !== currentUser.data.name) setisEdit(true)
    else setisEdit(false)
    setName(e.target.value)
    handleChange(e)
  }

  const handleChangeEmail = (e) => {
    if (e.target.value !== currentUser.data.email) setisEdit(true)
    else setisEdit(false)
    setEmail(e.target.value)
    handleChange(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit && isValid)  props.handleUpdateUser({name, email})
  }

  return (
    <div className="profile">
      <Header>
       <Navigation loggedIn={props.loggedIn}/>
     </Header>
      <form className="profile__container" onSubmit={handleSubmit}>
        <h2 className="profile__title">Привет, {currentUser?.data?.name || ''}</h2>
        <label className="profile__label">
          Имя
            <input
            id="name"
            name="name"
            type="text"
            className="profile__input"
            value={name || ''}
            onChange={handleChangeName}
            required
            minLength={2}
          />
        </label>
        <span className={`profile__error ${errors.name ? 'profile__error_visible' : ''}`}>{errors.name}</span>
        <label className="profile__label">
          E-mail
          <input
            name="email"
            type="email"
            className="profile__input"
            value={email || ''}
            onChange={handleChangeEmail}
            required
          />
        </label>
        <span className={`profile__error ${errors.email ? 'profile__error_visible' : ''}`}>{errors.email}</span>
        <div className="profile__button-container">
          <span className="profile__button-error">{props.error}</span>
          <button className={`profile__button profile__button_type_edit ${isEdit && isValid ? '' : 'profile__button_disable'}`} >Редактировать</button>
          <button className="profile__button profile__button_type_signout" onClick={props.signOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </div>

  );
}

export default Profile;
