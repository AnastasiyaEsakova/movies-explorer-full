import React from "react";
import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project">
      <a name="about-project"></a>
      <div className="about-project__container">
        <h3 className="about-project__title">О проекте</h3>
        <div className="about-project__info">
          <div className="about-project__info-container">
            <h4 className="about-project__info-title">Дипломный проект включал 5 этапов</h4>
            <p className="about-project__info-description">
              Составление плана, работу над бэкендом, вёрстку,
              добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__info-container">
            <h4 className="about-project__info-title">На выполнение диплома ушло 5 недель</h4>
            <p className="about-project__info-description">
              У каждого этапа был мягкий и жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__work-line">
          <div>
            <div className="about-project__work-line-progress">1 неделя</div>
            <p className="about-project__work-line-text">Back-end</p>
          </div>
          <div>
            <div className="about-project__work-line-progress about-project__work-line-progress_type_grey">4 недели</div>
            <p className="about-project__work-line-text">Front-end</p>
          </div>
        </div>
      </div>
    </section>

  );
}

export default AboutProject;
