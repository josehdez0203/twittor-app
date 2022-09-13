import './Error.scss';
import BasicLayout from '../../layout/basic_layout/Basic_layout';
import Error404Logo from '../../assets/png/error-404.png';
import Logo from '../../assets/png/logo.png';
import { Link } from 'react-router-dom';
const Error404 = () => {
  return (
    <div className="error404">
      <img src={Logo} alt="twittor" />
      <img src={Error404Logo} alt="error-404" />
      <Link to="/">Regresar</Link>
    </div>
  );
};

export default Error404;
