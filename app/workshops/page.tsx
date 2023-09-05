import Link from "next/link";
import "@/scss/structure/workshop-page/_workshop-page-content.scss";


export default function Workshops() {
    return (<>
        <section id="workshop-page-content">
            <h1>Нашите работилници</h1>
            <div className="workshop-page-content">
                <div className="workshop-page-content-item width-extended">
                    <Link className="book-workshop" href="#">zapishi se/ si chas</Link>
                </div>
                <div className="workshop-page-content-item width-normal-1">
                    <Link className="book-workshop" href="#">zapishi se/ si chas</Link>
                </div>
                <div className="workshop-page-content-item width-normal-2">
                    <Link className="book-workshop" href="#">zapishi se/ si chas</Link>
                </div>
                <div className="workshop-page-content-item heigh-extended">
                    <Link className="book-workshop" href="#">zapishi se/ si chas</Link>
                </div>
            </div>
        </section>
    </>);
}