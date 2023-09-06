import Link from "next/link";
import "@/scss/structure/workshop-page/_workshop-page-content.scss";


export default function Workshops() {
    return (<>
        <section id="workshop-page-content">
            <h1>Нашите работилници</h1>
            <div className="workshop-page-content">
                <div className="workshop-page-content-item width-extended">
                    <h2>Зората на фотографията</h2>
                    <Link className="visit" href="/workshops/the-beginning">Разгледай</Link>
                </div>
                <div className="workshop-page-content-item width-normal-1">
                    <h2>Начало на революцията</h2>
                    <Link className="visit" href="/workshops/the-revolution">Разгледай</Link>
                </div>
                <div className="workshop-page-content-item width-normal-2">
                    <h2>Краят на революцията</h2>
                    <Link className="visit" href="/workshops/the-end-of-revolution">Разгледай</Link>
                </div>
                <div className="workshop-page-content-item heigh-extended">
                    <h2>Семейна работилница</h2>
                    <Link className="visit" href="/workshops/family-workshop">Разгледай</Link>
                </div>
            </div>
        </section>
    </>);
}