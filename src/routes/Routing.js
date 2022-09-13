import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { map } from 'lodash';
import configRouting from './routes-config';

export default function Routing(props) {
  const { setCheckLogin } = props;
  return (
    <Router>
      <Routes>
        {map(configRouting, (route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={<route.page setCheckLogin={setCheckLogin} />}
          />
        ))}
      </Routes>
    </Router>
  );
}
