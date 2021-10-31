import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';

function Teacher(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div>
      {/* {user.name}! */}
      Welcome Teacher: {user} <br /><br />
      {console.log(user)}
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Teacher;
