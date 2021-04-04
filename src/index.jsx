import { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const app = (
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);

const root = document.getElementById('root');

render(app, root);
