import { useState } from 'react';
import { Form, Botton, Spinner, Button } from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isEmailValid } from '../../utils/validations';
import './login.scss';
import { SignIn, SetTokenApi } from '../../api/auth';
const LoginForm = (props) => {
  const { setCheckLogin } = props;
  const [formData, setFormData] = useState(initialValues());
  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (size(formData) !== validCount) {
      toast.warning('Completa todos los campos del formulario');
    } else if (!isEmailValid(formData.email)) {
      toast.warning('Email es invalido');
    } else {
      setLoading(true);
      // toast.success('!OK');
      SignIn(formData)
        .then((response) => {
          console.log('response ', response);
          if (response.message) {
            toast.warning(response.message);
          } else {
            SetTokenApi(response.token);
            setCheckLogin(true);
          }
        })
        .catch(() => {
          toast.error('Error del servidor, inténtelo más tarde');
        })
        .finally(() => setLoading(false));
    }
    console.log('Login...', formData, validCount);
  };

  function initialValues() {
    return {
      email: '',
      password: '',
    };
  }
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="singin-form">
      <h2>Entrar</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Correo Electrónico"
            onChange={onChange}
            name="email"
            value={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            name="password"
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {!loading ? 'Iniciar sesión' : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
