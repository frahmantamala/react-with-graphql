import { ApolloProvider } from '@apollo/client';
import './App.css';
import { client } from './AppoloClient/client';
import FilmList from './components/FilmList';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <FilmList />
      </div>
    </ApolloProvider>
  );
}

export default App;
