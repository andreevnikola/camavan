import "@/scss/structure/about-us-page/_hero.scss";
import "@/scss/structure/about-us-page/_craft.scss";
import "@/scss/structure/about-us-page/_caravan.scss";
import "@/scss/structure/about-us-page/_team.scss";



export default function AboutUs() {
    return (<>
        <section id="about-us">
          <img className="about-us-image" src="/images/hero.JPG" alt="logo" />
          <div className="about-us-title">
            <h1>За нас</h1>
          </div>
        </section>
        <section id="craft">
            <h2>Нашият занаят</h2>
            <div className="craft-description">
                <img className="craft-description-image" src="/images/hero-workshop-1.jpg" alt="camera"/>
                <p className="craft-description-text">Въвеждаме семействата в античната фотография, като им предлагаме история, теория и практика. Накрая те могат да запечатат този момент в снимка и да я проявят сами в караваната.</p>
            </div>
        </section>
        <section id="caravan">
            <h2>Подвижни сме</h2>
            <div className="caravan-description">
                <img className="caravan-description-image" src="/images/hero-workshop-1.jpg" alt="camera"/>
                <p className="caravan-description-text">Въвеждаме семействата в античната фотография, като им предлагаме история, теория и практика. Накрая те могат да запечатат този момент в снимка и да я проявят сами в караваната.</p>
            </div>
        </section>
        <section id="team">
            <h2>Екипът зад Вашите специални моменти</h2>
            <div className="team">
                <div className="team-member">
                    <img src="/images/team-member.png" alt="team-member"/>
                    <h4>Велена Марова</h4>
                    <span>фотограф</span>
                </div>
                <div className="team-member">
                    <img src="/images/team-member-2.png" alt="team-member"/>
                    <h4>Антон Саринов</h4>
                    <span>фотограф</span>
                </div>
                <div className="team-member">
                    <img src="/images/team-member-3.png" alt="team-member"/>
                    <h4>Петър Заринов</h4>
                    <span>фотограф</span>
                </div>
            </div>
            
        </section>
    </>
    );
}