import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dispatchLogin } from '../../store/actions/authAction';
import './Auth.scss';

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [signIn, setSignIn] = useState(true);
  const [message, setMessage] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (signIn) {
        const res = await axios.post('/user/login', { email, password });
        setMessage(res.data.message);
        dispatch(dispatchLogin());
        history.push('/');
      } else {
        const res = await axios.post('/user/register', {
          username,
          email,
          password,
        });

        setMessage(res.data.message);
      }
    } catch (err) {
      err.response.data.message && setMessage(err.response.data.message);
    }
  };

  return (
    <div class="auth">
      {message && <div>{message}</div>}
      <h2>{signIn ? 'Sign In' : 'Sign Up'}</h2>
      <form className="form" onSubmit={handleSubmit}>
        {!signIn && (
          <div className="form__row">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        )}
        <div className="form__row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form__row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form__row">
          <button type="submit">{signIn ? 'Login' : 'Register'}</button>
        </div>
      </form>
      <div className="auth__row">
        {signIn ? (
          <p>
            Don't have an account?&nbsp;
            <button onClick={() => setSignIn(false)}>Sign Up</button>
          </p>
        ) : (
          <p>
            Already have an account?&nbsp;
            <button onClick={() => setSignIn(true)}>Sign In</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
