import './Main.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Header from './Components/Header';
import Story from './pages/Weave';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateStory from './pages/CreateStory';
import SinglePost from './pages/SinglePost';
import Weave from './pages/Weave';
import Community from './pages/Community';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Header/>
    <div className="App">
      <Routes>
        <Route path="/story" element={<Story/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/create" element={<CreateStory/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/post/:postId" element={<SinglePost/>}/>
        <Route exact path="/weave/:postId/:sentences" element={<Weave/>} />
        <Route path="/me" element={<Profile/>}/>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  </Router>
  </ApolloProvider>
  );
}

export default App;
