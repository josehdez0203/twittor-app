import { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { getUser } from '../../api/user';
import { API_HOST } from '../../utils/constants';
import AvatarNotFound from '../../assets/png/avatar-no-found.png';

import './list_users.scss';
import { isEmpty } from 'lodash';

const User = (props) => {
  const { user } = props;
  const [userInfo, setUserInfo] = useState(null);
  console.log(' 🍎', user);

  useEffect(() => {
    getUser(user.id).then((response) => {
      console.log(' 💀 ', response);
      setUserInfo(response);
    });
  }, []);

  return (
    <a href={`/users/${user.id}`} className="list-users__user">
      <Image
        width={64}
        height={64}
        roundedCircle
        className="mr-3"
        src={
          userInfo?.avatar && !isEmpty(userInfo.avatar)
            ? `${API_HOST}/getAvatar?id=${user.id}`
            : AvatarNotFound
        }
        alt=""
      />
      <Card.Body>
        <h5>
          {user.nombre} {user.apellidos}
        </h5>
        <p>{userInfo?.biografia}</p>
      </Card.Body>
    </a>
  );
};

export default User;
