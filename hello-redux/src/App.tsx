import './App.css';
import { Provider } from 'react-redux';
import { store } from "./app/Store"
import ParamsForm from './components/ParamsFrom';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <ParamsForm />
        </header>
      </div>
    </Provider>
  );
}

export default App;
