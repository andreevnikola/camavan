import Link from "next/link";
import Image from "next/image";
import "@/scss/structure/workshop-page/workshop-topics/_hero.scss";
import "@/scss/structure/workshop-page/workshop-topics/_introduction.scss";
import "@/scss/structure/workshop-page/workshop-topics/_work.scss";


export default function TheBeginning() {
    return (<>
                <section id="workshop-topic-hero">
            <Image className="workshop-topic-hero-image" src="/images/hero-workshop-1.jpg" alt="workshop-one-hero" width={1440} height={788} />
            <div className="workshop-topic-hero-title">
                <h1>Начало на революцията</h1>
            </div>
            <div className="book-button">
                <Link  href="#">Резервирай билет</Link>  
            </div>
        </section>
        <section id="introduction-to-topic">
            <h2>Въведение</h2>
            <p>Всичко е започнало с една малка дупчица, прозорец и светлина. Само с тези 3 неща са открили фотографията – изкуството да уловиш всеки един момент в една снимка. Всичко това е започнало преди 2 века. Фотографията постоянно се е развивала и все още продължава. Удивително е колко часа са били прекарвани за една снимка.</p>
        </section>
        <section id="work">
            <div className="work-content">
                <img className="work-content-image-holder" src="/images/camera.jpg" alt="" />
                <div className="work-content-description-holder">
                    <h3>Допир</h3>
                    <p>Удивително е да видиш развитието на фотоапаратите и да ги докоснеш със собствените си ръце: да знаеш, наистина колко ценна е една снимка</p>
                </div>
            </div>
            <div className="work-content reversed">
                <div className="work-content-description-holder">
                    <h3>Практически задачи</h3>
                    <p>Най-удивителното е, че можеш да снимаш с тях! Да се върнеш години назад само като погледнеш през обектива.</p>
                </div>
                <img className="work-content-image-holder" src="/images/camera.jpg" alt="" />
            </div>
        </section>
    </>);
}