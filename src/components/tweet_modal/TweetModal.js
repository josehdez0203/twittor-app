import './tweet_modal.scss';
import { Modal, Form, Button } from 'react-bootstrap';
import { Close } from '../../utils/icons';
import classNames from 'classnames';
import { useState } from 'react';
import { AddTweet } from '../../api/tweets';
import { toast } from 'react-toastify';

const TweetModal = (props) => {
  const { show, setShow } = props;
  const [message, setMessage] = useState('');
  const maxLength = 280;

  const enviarTweet = (e) => {
    e.preventDefault();
    console.log('Enviando mensaje');
    if (message.length > 0 && message.length <= maxLength) {
      AddTweet(message)
        .then((response) => {
          if (response?.code >= 200 && response?.code < 300) {
            setShow(false);
            window.location.reload();
          }
        })
        .catch(() => {
          toast.warning('Error al enviar el tweet, intente más tarde');
        });
    }
    console.log(message);
  };

  return (
    <Modal
      className="tweet-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={enviarTweet}>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Qué estás pensando?"
            onChange={(e) => setMessage(e.target.value)}
          />

          <span
            className={classNames('count', {
              error: message.length > maxLength,
            })}
          >
            {message.length}
          </span>

          <Button
            type="submit"
            disabled={message.length > maxLength || message.length < 1}
          >
            Tweetear
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TweetModal;
