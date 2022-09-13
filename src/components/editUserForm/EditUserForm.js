import './edituserform.scss';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { API_HOST } from '../../utils/constants';
import { Camara } from '../../utils/icons';
import { uploadBanner, uploadAvatar, updateInfo } from '../../api/user';
import { toast } from 'react-toastify';
const EditUserForm = (props) => {
  const { user, setShow } = props;
  const [formData, setFormData] = useState(initialValues(user));
  const [bannerUrl, setBannerUrl] = useState(
    user?.banner ? `${API_HOST}/getBanner?id=${user.id}` : null
  );
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ? `${API_HOST}/getAvatar?id=${user.id}` : null
  );
  const [loading, setLoading] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const onDropBanner = useCallback((acceptedFile) => {
    console.log('🍎', acceptedFile);
    const file = acceptedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
  });

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  const onDropAvatar = useCallback((acceptedFile) => {
    console.log('🍎', acceptedFile);
    const file = acceptedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });

  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('editando usuario');
    if (bannerFile) {
      await uploadBanner(bannerFile).catch(() =>
        toast.error('Error al subir el banner')
      );
    }
    if (avatarFile) {
      await uploadAvatar(avatarFile).catch(() =>
        toast.error('Error al subir el avatar')
      );
    }
    console.log('🆔', formData);
    await updateInfo(formData)
      .then(() => {
        setShow(false);
      })
      .catch(() => toast.error('Error al actualizar los datos'));
    setLoading(false);
    window.location.reload();
  };
  function initialValues(user) {
    return {
      nombre: user.nombre || '',
      apellidos: user.apellidos || '',
      biografia: user.biografia || '',
      ubicacion: user.ubicacion || '',
      sitioweb: user.sitioweb || '',
      fecha_nacimento: user.fecha_nacimento || '',
    };
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  if (!formData) return null;
  return (
    <div className="edit-user-form">
      <div
        className="banner"
        style={{ background: `url('${bannerUrl}')` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <Camara />
      </div>
      <div
        className="avatar"
        {...getRootAvatarProps()}
        style={{ background: `url('${avatarUrl}')` }}
      >
        <input {...getInputAvatarProps()} />
        <Camara />
      </div>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            row="3"
            placeholder="agrega tu biografía"
            type="text"
            name="biografia"
            value={formData.biografia}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Tu sitio Web"
            type="text"
            name="sitioweb"
            value={formData.sitioweb}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <DatePicker
            placeholder="Fecha de nacimiento"
            locale={es}
            selected={new Date(formData.fecha_nacimento)}
            onChange={(value) =>
              setFormData({ ...formData, fecha_nacimento: value })
            }
          />
        </Form.Group>
        <Button className="btn-submit" variant="primary" type="submit">
          {loading && <Spinner animation="border" size="sm" />} Actualizar
        </Button>
      </Form>
    </div>
  );
};

export default EditUserForm;
