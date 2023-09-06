import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


export function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <h4>Работилници</h4>
        <div className="footer-container-content">
          <p>Зората на фотографията</p>
          <p>Революцията на фотографията</p>
          <p>Края на фотографията</p>
        </div>
      </div>
      <div className="footer-container">
        <h4>Услуги</h4>
          <div className="footer-container-content">
            <p>Конструиране</p>
            <p>Практика</p>
            <p>Фото курс</p>
          </div>
      </div>
      <div className="footer-container">
        <h4>Контакти</h4>
          <div className="footer-container-content">
            <p> Зората на фотографията</p>
            <p>Революцията на фотографията</p>
            <p>Края на фотографията</p>
          </div>
      </div>
    </footer>
  );
}
