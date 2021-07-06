import './App.css';
import { Home } from './components/Home'
import {Layout} from './Layout'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import SignIn from './pages/signIn'
import Register from './pages/register'
import BrowseAll from './pages/browseAll'
import PropDetails from './pages/propDetails'
import 'react-image-lightbox/style.css'


function App({...props}) {

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL || 'http://localhost:3030',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
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
            <Route path='/allproperties'>
              <Layout>
                <BrowseAll/>
              </Layout>
            </Route>
            <Route path='/property/:id'>
              <Layout>
                <PropDetails/>
              </Layout>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
