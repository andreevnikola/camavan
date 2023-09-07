import Link from "next/link";
import "@/scss/abstracts/_colors.scss";
import "@/scss/structure/landing-page/_hero.scss";
import "@/scss/structure/landing-page/_features.scss";
import "@/scss/structure/landing-page/_map.scss";
import "@/scss/structure/landing-page/_about-us.scss";
import "@/scss/structure/landing-page/_workshops.scss";
import Image from "next/image";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import Events from "./events/page";

export default function Home() {
  return (
    <>
      <main>
        <section id="hero">
          <img className="hero-image" src="/images/hero.jpg" alt="logo" />
          <div className="hero-title">
            <h1>Пътувайте през обектива на миналото</h1>
          </div>
        </section>
        <section id="features">
          <h2>Нашите предимства</h2>
          <div className="features">
            <div className="features_feature">
              <div className="features_feature_title">
                <h3>Подвижност</h3>
              </div>
              <div className="features_feature_description">
                <p>
                  Подвижността из цялата страна ни позволява да посетим много
                  различни градове.
                </p>
              </div>
            </div>
            <div className="features_feature">
              <div className="features_feature_title">
                <h3>Уникалност</h3>
              </div>
              <div className="features_feature_description">
                <p>
                  Предлагаме главно ретро заснемане и обучение интересно за
                  всяка възраст.
                </p>
              </div>
            </div>
            <div className="features_feature">
              <div className="features_feature_title">
                <h3>Обучение</h3>
              </div>
              <div className="features_feature_description">
                <p>
                  Работилниците ни се водят от професионалисти във фотографията
                  и изкуствата
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about-us">
          <img
            className="person"
            src="/images/person-transperent.png"
            alt="person"
          />
          <div className="about-us-description">
            <p>
              Това е нашият професионален фотограф - Илия. Занимава се с
              фотография от 25 години. Завършил е фотография в Берлин и е развил
              две магистратури в България на тема антични камери. Участва в
              много изложби със своите снимки. Освен цялата си професионална
              кариера, той снима навсякъде из България и разказва за пътуванията
              си в снимки. Занимава се с многобройни ретро камери и проявяване
              на снимки. Той ще ви покаже основите на фотографията. За него
              фотографията е като инструмент, на който той иска да научи всички
              нас.
            </p>
          </div>
        </section>
        <section id="map">
          <div className="map_title">
            <h2 className="text-center">Маршрута на караваната</h2>
          </div>
          <Events />
        </section>
        <section id="workshops">
          <div className="workshops">
            <div className="workshops-one-to-three">
              <div className="workshop-item one">
                <h3>Зората</h3>
              </div>
              <div className="workshop-item two">
                <h3>Революция</h3>
              </div>
              <div className="workshop-item three">
                <h3>Краят на ретрото</h3>
              </div>
            </div>
            <div className="workshops-fourth">
              <div className="workshop-item-expanded">
                <h3>Семеен</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
