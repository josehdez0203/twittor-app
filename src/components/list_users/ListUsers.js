import './list_users.scss';
import User from './User';
import { map, isEmpty } from 'lodash';
const ListUsers = (props) => {
  console.log('😒props', props);
  const { users } = props;
  if (isEmpty(users)) return <h2>No hay resultados</h2>;
  return (
    <div className="list-users">
      {map(users, (user) => {
        console.log('😒user ', user);
        return <User user={user} />;
      })}
    </div>
  );
};

export default ListUsers;
