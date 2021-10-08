import './App.css';
import { Home } from './components/Home'
import { Layout } from './Layout'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import SignIn from './pages/signIn'
import Register from './pages/register'
import BrowseAll from './pages/browseAll'
import PropDetails from './pages/propDetails'
import CitysProps from './pages/citysProps';
import Profile from './pages/profile';
import MyProps from './pages/myprops';
import CreateProp from './pages/createprop';
import 'react-image-lightbox/style.css'
import jwtDecode from 'jwt-decode';

function App({...props}) {
  
  const link = createHttpLink({
    uri: process.env.REACT_APP_API_URL || 'http://localhost:3030/graphql',
    credentials: 'include',
  });
  const auth = setContext((_, { headers }) => {
    const accessToken = localStorage.getItem('accessToken');
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `bearer ${accessToken}` : ''
      }
    }
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      new TokenRefreshLink({
        accessTokenField: 'accessToken',
        isTokenValidOrUndefined: () => {
          const token = localStorage.getItem('accessToken');
          if(!token) 
            return true;
          try{
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 1000) 
              return false;
            return true;
          }catch(err){
            console.log(err);
            return false;
          }
        },
        fetchAccessToken: async () => {
          return await fetch(process.env.REFRESH_TOKEN || 'http://localhost:3030/refresh_token',{
            method: 'POST',
            credentials: 'include'
          });
        },
        handleFetch: (accessToken) => {
          localStorage.setItem('accessToken',accessToken);
        },
        handleError: (err) => {
          console.warn("Your refresh token is invalid. Try to relogin");
          console.log(err);
        },
      }),
      auth.concat(link)
    ])
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
            <Route path='/properties/:city'>
              <Layout>
                <CitysProps/>
              </Layout>
            </Route>
            <Route path='/profile'>
              <Layout>
                <Profile/>
              </Layout>
            </Route>
            <Route path='/myprops'>
              <Layout>
                <MyProps/>
              </Layout>
            </Route>
            <Route path='/createprop'>
              <Layout>
                <CreateProp/>
              </Layout>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
