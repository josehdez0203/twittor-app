import './config_modal.scss';
import { Close } from '../../utils/icons';
import { Modal } from 'react-bootstrap';

const ConfigModal = (props) => {
  const { show, setShow, title, children } = props;

  return (
    <Modal
      className="config-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
          <h2>{title}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ConfigModal;
