import imagen1 from "../assets/Image20231115154351.png";
import imagen2 from "../assets/Image20231115154345.png";
import imagen3 from "../assets/Image20231115154349.png";
import imagen4 from "../assets/Image20231115154355.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="left-section">
          <div className="image-container-logo">
            <img src={imagen4} alt="Descripción de la imagen 1" />
          </div>
          <h2>SÍGUENOS EN:</h2>
          <div className="image-container">
            <img src={imagen1} alt="Descripción de la imagen 1" />
            <img src={imagen2} alt="Descripción de la imagen 2" />
            <img src={imagen3} alt="Descripción de la imagen 3" />
          </div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
          odio deserunt nesciunt blanditiis iusto ullam vero. Ullam odit aliquam
          sequi id numquam iste, mollitia dolor voluptas recusandae sit illum
          blanditiis.
        </div>
      </div>
    </div>
  );
};

export default Footer;
