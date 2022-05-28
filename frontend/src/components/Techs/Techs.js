import React from "react";
import './Techs.css'

function Techs() {
  const techsArray = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB']
  return (
    <section className="techs">
      <a name="techs"></a>
      <div className="techs__container">
        <h3 className="techs__title">Технологии</h3>
        <div className="techs__info">
          <h2 className="techs__info-title">7 технологий</h2>
          <p className="techs__info-description">
            На курсе веб-разработки мы освоили технологии,
            которые применили в дипломном проекте.
          </p>
          <div className="techs__list">
            { techsArray.map((item) => {
              return <div className="techs__item" key={item} >{item}</div>
            }) }
          </div>
        </div>
      </div>
    </section>

  );
}

export default Techs;
