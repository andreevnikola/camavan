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
          <Image
            className="hero_image"
            src="/images/her.jpg"
            alt="logo"
            width={1000}
            height={800}
          />
          <div className="hero-title">
            <h1>Пътувайте през обектива на миналото</h1>
          </div>
        </section>
        <section id="features">
          <h2>Нашите предимства</h2>
          <div className="features">
            <div className="features_feature">
              <div className="features_feature_title">
                <FontAwesomeIcon
                  className="features_feature_title_icon"
                  icon={faPerson}
                  width={40}
                  height={40}
                />
                <h3>Cool stuff that goes here</h3>
              </div>
              <div className="features_feature_description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia in adipisci commodi molestias, distinctio laborum rem
                  consequatur impedit ipsam veritatis accusantium officiis eaque
                  sit porro incidunt recusandae autem voluptates maxime?
                </p>
              </div>
            </div>
            <div className="features_feature">
              <div className="features_feature_title">
                <FontAwesomeIcon
                  className="features_feature_title_icon"
                  icon={faPerson}
                  width={40}
                  height={40}
                />
                <h3>Cool stuff that goes here</h3>
              </div>
              <div className="features_feature_description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia in adipisci commodi molestias, distinctio laborum rem
                  consequatur impedit ipsam veritatis accusantium officiis eaque
                  sit porro incidunt recusandae autem voluptates maxime?
                </p>
              </div>
            </div>
            <div className="features_feature">
              <div className="features_feature_title">
                <FontAwesomeIcon
                  className="features_feature_title_icon"
                  icon={faPerson}
                  width={40}
                  height={40}
                />
                <h3>Cool stuff that goes here</h3>
              </div>
              <div className="features_feature_description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia in adipisci commodi molestias, distinctio laborum rem
                  consequatur impedit ipsam veritatis accusantium officiis eaque
                  sit porro incidunt recusandae autem voluptates maxime?
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about-us">
          <Image
            className="person"
            src="/images/person.png"
            alt="person"
            width={449}
            height={620}
          />
          <div className="about-us-description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              esse illum unde libero reprehenderit officia id ipsum, voluptatem
              rerum. At excepturi enim nesciunt praesentium debitis vitae
              asperiores corporis saepe voluptatem.orem ipsum dolor sit amet
              consectetur adipisicing elit. Aperiam esse illum unde libero
              reprehenderit officia id ipsum, voluptatem rerum. At excepturi
              enim nesciunt praesentium debitis vitae asperiores corporis saepe
              voluptatem.orem ipsum dolor sit amet consectetur adipisicing elit.
              Aperiam esse illum unde libero reprehenderit officia id ipsum,
              voluptatem rerum. At excepturi enim nesciunt praesentium debitis
              vitae asperiores corporis saepe voluptatem.
            </p>
            <Link className="map_directing_button" href="#">
              Бутон за скролване
            </Link>
          </div>
        </section>
        <section id="map">
          <div className="map_title w-full flex justify-center px-7">
            <h2 className="w-full max-w-4xl p-0">Маршрута на караваната</h2>
          </div>
          <Events />
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
