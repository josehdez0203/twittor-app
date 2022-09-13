import { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import './registro.scss';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isEmailValid } from '../../utils/validations';
import { SignUp } from '../../api/auth';

const SignUpForm = (props) => {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    console.log(validCount, formData);
    if (validCount !== size(formData)) {
      toast.warning('Completa los campos');
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning('el Email no es válido');
      } else if (formData.password !== formData.repeatPassword) {
        toast.warning('Las contraseñas no coinciden');
      } else if (size(formData.password) < 6) {
        toast.warning('La contraseña debe tener 6 caracteres mínimo');
      } else {
        setLoading(true);
        // toast.success('Formulario ok!');
        SignUp(formData)
          .then((response) => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              toast.success('El registro ha sido correcto');
              setShowModal(false);
              setFormData(initialFormValue());
            }
          })
          .catch(() => {
            toast.error('Error del servidor, inténtelo más tarde');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  function initialFormValue() {
    return {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      repeatPassword: '',
    };
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="signup-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                name="nombre"
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={(e) =>
                  setFormData({ ...formData, apellidos: e.target.value })
                }
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                name="repeatPassword"
                placeholder="Repetir contraseña"
                value={formData.repeatPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    repeatPassword: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!loading ? 'Registrarse' : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
};

export default SignUpForm;
