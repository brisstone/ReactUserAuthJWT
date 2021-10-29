import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

export default function Register(props) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
		  alert('Password and confirm password are not match');
		} else {
                   //   dispatch(register(name, email, password));\
        axios.post('http://localhost:4000/users/register', { username: name, password: password, email: email }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            if(response.data.user.status === 'success'){
                props.history.push('/login');
            }else{
                response.json.send('Error registering')
            }
		

        });
    }  
};

    
    
    return (
        <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {/* {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>} */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link to={`/login`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
    );
}
