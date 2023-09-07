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
  return (<>
    <main>
      <section id="hero">
          <img className="hero-image" src="/images/hero.JPG" alt="logo" />
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
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia in adipisci commodi molestias, distinctio laborum rem consequatur impedit ipsam veritatis accusantium officiis eaque sit porro incidunt recusandae autem voluptates maxime?</p>
            </div>
          </div>
          <div className="features_feature">
            <div className="features_feature_title">
              <h3>Подвижност</h3>
            </div>
            <div className="features_feature_description">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia in adipisci commodi molestias, distinctio laborum rem consequatur impedit ipsam veritatis accusantium officiis eaque sit porro incidunt recusandae autem voluptates maxime?</p>
            </div>
          </div>
          <div className="features_feature">
            <div className="features_feature_title">
              <h3>Подвижонст</h3>
            </div>
            <div className="features_feature_description">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia in adipisci commodi molestias, distinctio laborum rem consequatur impedit ipsam veritatis accusantium officiis eaque sit porro incidunt recusandae autem voluptates maxime?</p>
            </div>
          </div>
        </div>
      </section>
      <section id="about-us">
        <img className="person" src="/images/person-transperent.png" alt="person"/>
        <div className="about-us-description">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam esse illum unde libero reprehenderit officia id ipsum, voluptatem rerum. At excepturi enim nesciunt praesentium debitis vitae asperiores corporis saepe voluptatem.orem ipsum dolor sit amet consectetur adipisicing elit. Aperiam esse illum unde libero reprehenderit officia id ipsum, voluptatem rerum. At excepturi enim nesciunt praesentium debitis vitae asperiores corporis saepe voluptatem.orem ipsum dolor sit amet consectetur adipisicing elit. Aperiam esse illum unde libero reprehenderit officia id ipsum, voluptatem rerum. At excepturi enim nesciunt praesentium debitis vitae asperiores corporis saepe voluptatem.</p>
          <Link className="map_directing_button" href="#">Бутон за скролване</Link>
        </div>
      </section>
      <section id="map">
        <div className="map_title">
          <h2>Маршрута на караваната</h2>
        </div>
      </section>
      <section id="workshops">
        <div className="workshops">
          <div className="workshops-one-to-three">
            <div className="workshop-item one">
              <h3>workshop 1</h3>
            </div>
            <div className="workshop-item two">
              <h3>workshop 1</h3>
            </div>
            <div className="workshop-item three">
              <h3>workshop 1</h3>
            </div>
          </div>
          <div className="workshops-fourth">
            <div className="workshop-item-expanded">
              <h3>workshop 1</h3>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
