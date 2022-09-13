import './banner_avatar.scss';
import { API_HOST } from '../../utils/constants';
import AvatarNoFound from '../../assets/png/avatar-no-found.png';
import { Button } from 'react-bootstrap';
import ConfigModal from '../../components/configmodal/ConfigModal';
import EditUserForm from '../../components/editUserForm/EditUserForm';
import { useEffect, useState } from 'react';
import { CheckFollow, Follow, Unfollow } from '../../api/follow';

const BannerAvatar = (props) => {
  const { user, userLogged } = props;
  const [show, setShow] = useState(false);
  const [following, setFollowing] = useState(null);
  const [updateFollow, setUpdateFollow] = useState(false);
  const bannerUrl = user?.banner ? `${API_HOST}/getBanner?id=${user.id}` : null;
  const avatarUrl = user?.avatar
    ? `${API_HOST}/getAvatar?id=${user.id}`
    : AvatarNoFound;
  console.log(userLogged);
  console.log(user);

  useEffect(() => {
    CheckFollow(user?.id).then((response) => {
      console.log(response);
      if (user) {
        if (response.status) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      }
      setUpdateFollow(false);
    });
  }, [user, updateFollow]);

  const follow = () => {
    Follow(user.id).then(() => {
      console.log('Seguir usuario');
      setUpdateFollow(true);
    });
  };
  const unFollow = () => {
    Unfollow(user.id).then(() => {
      console.log('No seguir usuario');
      setUpdateFollow(true);
    });
  };

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}'` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}'` }}
      />
      {user && (
        <div className="options">
          {userLogged._id === user.id && (
            <Button onClick={() => setShow(true)}>Editar perfil</Button>
          )}
          {userLogged._id !== user.id &&
            following !== null &&
            (following ? (
              <Button onClick={unFollow} className="unfollow">
                <span>Siguiendo</span>
              </Button>
            ) : (
              <Button onClick={follow}>Seguir</Button>
            ))}
        </div>
      )}
      <ConfigModal show={show} setShow={setShow} title="Editar perfil">
        <EditUserForm user={user} setShow={setShow} />
      </ConfigModal>
    </div>
  );
};

export default BannerAvatar;
