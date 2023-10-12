import api from './Api';

// Login screen
export async function signIn (username, password) {
  try {
    const response = await api.post('/sessions', { email: username, password: password });
    api.setHeader('Authorization', 'Bearer ' + response.data.token);
    return response;
  } catch (err) {
    return err;
  }
}

// Appointment screen

export async function getAppointments (userId, page) {
  try {
    const response = await api.get('/appointments', { userId: userId, page: page ? page : 1 });
    return response;
  } catch (err) {
    return err;
  }
}
