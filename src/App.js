import './App.css';
import { Home } from './components/Home'
import {Layout} from './Layout'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import SignIn from './pages/signIn'
import Register from './pages/register'

function App({...props}) {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Layout>
              <Home {...props}/>
            </Layout>
          </Route>
          <Route path='/signin'>
            <SignIn/>
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
