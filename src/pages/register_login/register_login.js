import { Container, Row, Col, Button } from 'react-bootstrap';
import './register_login.scss';
import LogoWhite from '../../assets/png/logo-white.png';
import Logo from '../../assets/png/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalWindow from '../../components/modal/modal';
import SignUpForm from '../../components/registro/registro.js';
import LoginForm from '../../components/login/login.js';
import {
  faSearch,
  faUsers,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const RegisterLogin = (props) => {
  const { setCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };
  return (
    <>
      <Container>
        <Row>
          <LeftComponent />
          <RightComponent setCheckLogin={setCheckLogin} />
        </Row>
      </Container>
      <ModalWindow show={showModal} setShow={setShowModal}>
        {contentModal}
      </ModalWindow>
    </>
  );
  function LeftComponent() {
    return (
      <Col className="signup__left" xs={6}>
        <img src={Logo} alt="twittor" />
        <div>
          <h2>
            <FontAwesomeIcon icon={faSearch} /> Sigue lo que te interesa.
          </h2>
          <h2>
            <FontAwesomeIcon icon={faUsers} />
            Entérate de qué está hablando la gente.
          </h2>
          <h2>
            <FontAwesomeIcon icon={faComment} />
            Únete a la conversación.
          </h2>
        </div>
      </Col>
    );
  }
  function RightComponent(props) {
    const { setCheckLogin } = props;
    return (
      <Col className="signup__right" xs={6}>
        <div>
          <img src={LogoWhite} alt="logo-white" />
          <h2>Mira lo que está pasando en el mundo en este momento</h2>
          <h3>Únete a Twittor hoy mismo</h3>
          <Button
            variant="primary"
            onClick={() =>
              openModal(<SignUpForm setShowModal={setShowModal} />)
            }
          >
            Registrate
          </Button>
          <Button
            variant="outline-primary"
            onClick={() =>
              openModal(
                <LoginForm
                  setShowModal={setShowModal}
                  setCheckLogin={setCheckLogin}
                />
              )
            }
          >
            Iniciar sesión
          </Button>
        </div>
      </Col>
    );
  }
};
export default RegisterLogin;
