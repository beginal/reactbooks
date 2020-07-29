import React from 'react'
import { NavLink, Route } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
  const AC = {
    background: 'black',
    color: 'white'
  }
  return (
    <div>
      <h3>사용자목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={AC} active to="/profiles/velopert">velopert</NavLink>
        </li>
        <li>
          <NavLink activeStyle={AC} to="/profiles/gildong">gildong</NavLink>
        </li>
      </ul>

      <Route
        path='/profiles'
        exact
        render={() => <div>사용자를 선택해주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  )
}

export default Profiles
