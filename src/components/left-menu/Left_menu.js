import './left_menu.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoWhite from '../../assets/png/logo-white.png';
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import TweetModal from '../../components/tweet_modal/TweetModal';
import { Button } from 'react-bootstrap';
import { LogOut } from '../../api/auth';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const LeftMenu = (props) => {
  const { setCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const user = useAuth();
  // console.log(user);
  const logout = () => {
    LogOut();
    setCheckLogin(true);
  };
  return (
    <div className="left-menu">
      <img className="logo" src={LogoWhite} alt="twittor" />
      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Inicio
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} /> Usuarios
      </Link>
      <Link to={`/users/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} /> Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión
      </Link>
      <Button onClick={() => setShowModal(true)}>crear Tweet</Button>
      <TweetModal show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default LeftMenu;
