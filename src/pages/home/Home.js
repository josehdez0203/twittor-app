import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layout/basic_layout/Basic_layout.js';
import { GetTweetsFollowers } from '../../api/tweets';
import ListTweets from '../../components/list_tweets/ListTweets';
import { Button, Spinner } from 'react-bootstrap';

import './Home.scss';
export default function Home(props) {
  const { setCheckLogin } = props;
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(page, 'page');
    GetTweetsFollowers(page)
      .then((response) => {
        console.log(response);
        if (!tweets && response) {
          setTweets(formatTweets(response));
          setLoading(false);
        } else if (!response) {
          setLoading(0);
        } else {
          const data = formatTweets(response);
          setTweets([...tweets, ...data]);
          setLoading(false);
        }
        console.log('loading', loading, 'page', page);
      })
      .catch((err) => console.log(err.Error()));
  }, [page]);

  const moreData = () => {
    console.log('cargando...');
    setLoading(true);
    setPage(page + 1);
  };
  return (
    <BasicLayout className="home" setCheckLogin={setCheckLogin}>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>
      <ListTweets tweets={tweets} />
      <Button className="load-more" onClick={moreData}>
        {!loading ? (
          loading !== 0 && 'Cargar más'
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
    </BasicLayout>
  );
}

function formatTweets(tweets) {
  const convertidos = [];
  tweets.forEach((tweet) => {
    console.log(tweet);
    convertidos.push({
      _id: tweet._id,
      userid: tweet.userRelationId,
      mensaje: tweet.Tweet.mensaje,
      fecha: tweet.Tweet.fecha,
    });
  });
  return convertidos;
}
