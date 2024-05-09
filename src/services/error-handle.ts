import { store } from '../store';
import { TIMEOUT_SHOW_ERROR } from '../const';
import { setError, removeError } from '../store/error-message-process/error-message-process.slice';

export const errorHandle = (message: string | null): void => {
  store.dispatch(setError({ error: message }));

  setTimeout(() => {
    store.dispatch(removeError());
  }, TIMEOUT_SHOW_ERROR);
};

