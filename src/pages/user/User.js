import './user.scss';
import BasicLayout from '../../layout/basic_layout/Basic_layout';
import BannerAvatar from '../../components/banner_avatar/Baner_avatar';
import { useParams } from 'react-router-dom';
import { getUser } from '../../api/user';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import InfoUser from '../../components/info_user/InfoUser';
import { GetTweets } from '../../api/tweets';
import ListTweets from '../../components/list_tweets/ListTweets';
import { Button, Spinner } from 'react-bootstrap';

function User() {
  // console.log('PROPS', props);
  let params = useParams();
  /*   let id = params.id; */
  const userLogged = useAuth();

  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);
  console.log('tweets', tweets);
  useEffect(() => {
    console.log('☕', params.id);
    getUser(params.id)
      .then((response) => {
        // if (!response) toast.error('Usuario no existente');
        setUser(response);
      })
      .catch(() => {
        toast.error('Usuario no existente');
      });
  }, [params.id]);
  useEffect(() => {
    GetTweets(params.id, 1)
      .then((response) => {
        setTweets(response);
      })
      .catch(() => {
        setTweets([]);
      });
  }, [params]);
  if (!user) return null;

  function moreData() {
    console.log('buscando tweets');
    const tempPage = page + 1;
    setLoadingTweets(true);
    GetTweets(params.id, tempPage).then((response) => {
      if (!response) {
        setLoadingTweets(0);
      } else {
        setTweets([...tweets, ...response]);
        setPage(tempPage);
        setLoadingTweets(false);
      }
    });
  }

  return (
    <BasicLayout className="user">
      <div className="user__title">
        <h2>
          {user ? `${user.nombre} ${user.apellidos}` : 'Este usuario no existe'}
        </h2>
      </div>
      <BannerAvatar user={user} userLogged={userLogged} />
      <InfoUser user={user} />
      <div className="user__tweets">
        {tweets && <ListTweets tweets={tweets} />}
        <Button onClick={moreData}>
          {!loadingTweets ? (
            loadingTweets !== 0 && 'Cargar más'
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

export default User;
