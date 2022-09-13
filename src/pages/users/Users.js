import './users.scss';
import { Spinner, ButtonGroup, Button } from 'react-bootstrap';
import BasicLayout from '../../layout/basic_layout/Basic_layout';
import { getUsers } from '../../api/follow';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import ListUsers from '../../components/list_users/ListUsers';
import { useDebouncedCallback } from 'use-debounce';
import { isEmpty } from 'lodash';

const Users = (props) => {
  console.log(props);
  const { setCheckLogin } = props;
  const [users, setUsers] = useState(null);
  const [typeUser, setTypeUser] = useState('follow');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const onSearch = useDebouncedCallback((value) => {
    console.log(value);
    setPage(1);
    setSearch(value);
    params = setQuery();
  }, 200);
  // setPage(1);
  let params = setQuery();

  useEffect(() => {
    console.log('Params', params);
    getUsers(params)
      .then((response) => {
        console.log('HTTP', response);
        if (page === 1) {
          if (isEmpty(response)) {
            setUsers([]);
          } else {
            setUsers(response);
          }
        } else {
          if (!response) {
            setLoading(0);
          } else {
            setUsers([...users, ...response]);
            setLoading(false);
          }
        }
      })
      .catch(() => {
        setUsers([]);
      });
  }, [params, search]);

  const onChangeType = (type) => {
    console.log(type);
    setUsers(null);
    setPage(1);
    setLoading(false);
    if (type === 'new') {
      setTypeUser('new');
    } else {
      setTypeUser('follow');
    }
  };

  function setQuery() {
    const busca = {
      page: page,
      type: typeUser,
      search: search,
    };
    console.log('busca', queryString.stringify(busca));
    return queryString.stringify(busca);
  }
  const moreData = () => {
    console.log('buscando usuarios...');
    setLoading(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout
      className="users"
      title="Usuarios"
      setCheckLogin={setCheckLogin}
    >
      <div className="users__title">
        <h2>Usuarios</h2>
        <input
          type="text"
          placeholder="Busca un usuario..."
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
      </div>
      <ButtonGroup className="users__options">
        <Button
          className={typeUser === 'follow' && 'active'}
          onClick={() => onChangeType('follow')}
        >
          Siguiendo
        </Button>
        <Button
          className={typeUser === 'new' && 'active'}
          onClick={() => onChangeType('new')}
        >
          Nuevos
        </Button>
      </ButtonGroup>
      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          Buscando usuarios
        </div>
      ) : (
        <>
          <ListUsers users={users} />
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
            )}{' '}
          </Button>
        </>
      )}
    </BasicLayout>
  );
};

export default Users;
