import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // http://localhost:4000/users/signin
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post("/login", { email: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.token, response.data[2].Info.split(", ")[1].replace(/^'(.*)'$/, '$1'));
      console.log(response.data[2].Info)
      console.log(response.data[2].Info.split(", ")[1].replace(/^'(.*)'$/, '$1'))
      // console.log(response.data[2].Info[1])
      if(response.data[0].Adm == 1){
          props.history.push('/teacher');
      }else{
        props.history.push('/student');
         console.log(" student");
      }
     
    }).catch(error => {
      setLoading(false);
        console.log(error);
        if (error.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      
    });
  }

  return (
    <div>
      Login Here<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;