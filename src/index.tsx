import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import { ToastContainer } from 'react-toastify';
import { fetchCameras, fetchPromos } from './store/api-actions';

store.dispatch(fetchCameras());
store.dispatch(fetchPromos());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
      <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
