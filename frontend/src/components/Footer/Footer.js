import React from "react";
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__info">
          <p className="footer__copyright">&copy; 2022</p>
          <nav className="footer__links">
            <a href="https://practicum.yandex.ru" className="footer__link" target="_blank">Яндекс.Практикум</a>
            <a  href="https://github.com/AnastasiyaEsakova" className="footer__link" target="_blank">Github</a>
            <a  href="#" className="footer__link" target="_blank">Facebook</a>
          </nav>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
