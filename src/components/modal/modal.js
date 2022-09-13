import './modal.scss';
import { Modal } from 'react-bootstrap';
import LogoWhite from '../../assets/png/logo-white.png';
const ModalWindow = (props) => {
  const { show, setShow, children } = props;
  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <img src={LogoWhite} alt="twittor" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalWindow;
