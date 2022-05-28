import React from "react";
import Portfolio from "../Portfolio/Portfolio";
import './AboutMe.css'

function AboutMe() {
  return (
    <section className="about-me">
      <a name="about-me"></a>
      <div className="about-me__container">
        <h3 className="about-me__title">Студент</h3>

        <div className="about-me__info">
          <div className="about-me__description">
            <h4 className="about-me__description-title">Анастасия</h4>
            <p className="about-me__description-post">Фронтенд-разработчик, 23 года</p>
            <p className="about-me__description-text">
            Я родилась и живу в Москве, закончила факультет истории, политологии и права МГОУ.
            В процессе обучения я поняла, что мне очень нравится заниматься программированием, поэтому решила пройти курс по фронтенд-разработке.
            В свбодное время люблю заниматься рисованием в разных техниках, играю, слушаю музыку.
            </p>
            <div className="about-me__description-links">
              <a href="#" className="about-me__description-link" target="_blank">Facebook</a>
              <a href="https://github.com/AnastasiyaEsakova" className="about-me__description-link" target="_blank">Github</a>
            </div>
          </div>
          <div className="about-me__photo"></div>
        </div>
        <Portfolio />
      </div>
    </section>

  );
}

export default AboutMe;
