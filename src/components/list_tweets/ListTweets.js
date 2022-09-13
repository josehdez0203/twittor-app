import './list_tweets.scss';
import { Image } from 'react-bootstrap';
import { map } from 'lodash';
import AvatarNoFound from '../../assets/png/avatar-no-found.png';
import { API_HOST } from '../../utils/constants';
import { getUser } from '../../api/user';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { replaceURLWithHTMLLinks } from '../../utils/funciones';

export default function ListTweets(props) {
  const { tweets } = props;
  console.log('🛂', tweets);
  return (
    <div className="list-tweets">
      {map(tweets, (tweet) => {
        return <Tweet tweet={tweet} />;
      })}
    </div>
  );
}

function Tweet(props) {
  const { tweet } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUser(tweet.userid).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${API_HOST}/getAvatar?id=${response.id}`
          : AvatarNoFound
      );
    });
  }, [tweet]);

  console.log(tweet);
  return (
    <div className="tweet">
      <Image src={avatarUrl} className="avatar" roundedCircle />
      <div>
        <div className="name">
          {userInfo?.nombre} {userInfo?.apellidos}
          <span> {moment(tweet.fecha).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(tweet.mensaje),
          }}
        />
      </div>
    </div>
  );
}
