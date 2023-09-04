import Link from "next/link";
import "./Landing.css";

export default function Home() {
  return (<>
    <main>
      <section className="hero">
          <img src="/images/branding/hero.jpg" alt="hero-main-image" />
          <div className="hero-title">
              <h1>Нашето заглавие</h1>
          </div>
      </section>
      <section className="about-us">
        <img src="/images/branding/person.png" alt="person" />
        <div className="about-us-text">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, et, dolor quam deserunt tempore omnis, enim distinctio voluptas assumenda eius suscipit quos nesciunt odit ab sapiente veniam amet eligendi possimus!</p>
          <Link className="map-routing-button" href="#">Our map</Link>
        </div>
      </section>
    </main>
    </>
  );
}
