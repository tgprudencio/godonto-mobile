import api from './Api';

// Login screen
export async function signIn (username, password) {
  try {
    const response = await api.post('/sessions', { email: username, password: password });
    api.setHeader('Authorization', response.data.token);
    return response;
  } catch (err) {
    return err;
  }
}
