import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const { isLogged } = useSelector(state => state.auth);
  const handleLogout = async () => {};

  return (
    <header className="wrapper header__wrapper">
      <div className="logo">
        <Link className="logo__link" to="/">
          Home
        </Link>
      </div>
      <ul className="nav">
        {isLogged ? (
          <>
            <li className="nav__item">
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <li className="nav__item">
            <Link className="nav__link" to="/auth">
              Sign in
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
