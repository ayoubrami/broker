import './App.css';
import { Home } from './components/Home'
import {Layout} from './Layout'
import SignIn from './pages/signIn'
import Register from './pages/register'
import BrowseAll from './pages/browseAll'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

function App({...props}) {

  const client = new ApolloClient({
    uri: 'http://localhost:3030',
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
            <Route>
              <Layout>
                <BrowseAll/>
              </Layout>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
