import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';

export default function Student(props) {

    const user = getUser();

     // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }


    return (
        <div>
            Welcome Student {user.name}!<br /><br />
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    )
}
