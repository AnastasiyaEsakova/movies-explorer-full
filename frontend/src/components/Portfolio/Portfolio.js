import React from "react";
import './Portfolio.css'

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__links-title">Портфолио</p>
          <ul className="portfolio__list">
            <li className="portfolio__item">
              <a href="https://anastasiyaesakova.github.io/how-to-learn/index.html" target="_blank" className="portfolio__link">
                Статичный сайт
                <div className="portfolio__arrow"></div>
              </a>
            </li>
            <li className="portfolio__item">
              <a href="https://anastasiyaesakova.github.io/russian-travel/index.html" target="_blank" className="portfolio__link">
                Адаптивный сайт
                <div className="portfolio__arrow"></div>
              </a>
            </li>
            <li className="portfolio__item">
              <a href="https://anastasiyaesakova.github.io/mesto/index.html" target="_blank" className="portfolio__link">
                Одностраничное приложение
                <div className="portfolio__arrow"></div>
              </a>
            </li>
          </ul>
    </div>

  );
}

export default Portfolio;
