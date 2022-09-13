import './info_user.scss';
import { Location, Link, DateBirth } from '../../utils/icons';
import moment from 'moment';
import localization from 'moment/locale/es';

const InfoUser = (props) => {
  const { user } = props;
  console.log('💀', user);
  return (
    <div className="info-user">
      <h2 className="name">
        {user.nombre} {user.apellidos}
      </h2>
      <p className="email">{user.email}</p>
      {user.biografia && <div className="description">{user.biografia}</div>}
      <div className="more-info">
        {user.ubicacion && (
          <p>
            <Location />
            {user.ubicacion}
          </p>
        )}
        {user?.sitioweb && (
          <a
            href={user.sitioweb}
            alt={user.sitioweb}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link />
            {user.sitioweb}
          </a>
        )}
        {user?.fecha_nacimento && (
          <p>
            <DateBirth />
            {moment(user.fecha_nacimento)
              .locale('es', localization)
              .format('LL')}
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoUser;
