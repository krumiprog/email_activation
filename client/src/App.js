import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Activate from './components/Auth/Activate';
import Auth from './components/Auth/Auth';

const App = () => {
  const { isLogged } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth">{isLogged ? <Redirect to="/" /> : <Auth />}</Route>
        <Route path="/user/activate/:activate_token" component={Activate} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
