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

export async function deleteAppointment (appointmentId) {
  try {
    const response = await api.delete('/appointments/' + appointmentId);
    return response;
  } catch (err) {
    return err;
  }
}

// AppointmentNew screen

export async function getMembers () {
  try {
    const response = await api.get('/members');
    return response;
  } catch (err) {
    return err;
  }
}

export async function getAvailableDates () {
  try {
    const response = await api.get('/alldates');
    return response;
  } catch (err) {
    return err;
  }
}

export async function getAvailableTimes (memberId, date) {
  try {
    const response = await api.get('/providers/' + memberId + '/available', { date: date });
    return response;
  } catch (err) {
    return err;
  }
}

export async function createAppointment (userId, memberId, date) {
  try {
    const response = await api.post('/appointments', { userId: userId, memberId: memberId, date: date });
    return response;
  } catch (err) {
    return err;
  }
}

export async function updateAppointment (appointmentId, userId, memberId, date) {
  try {
    const response = await api.put('/appointments/' + appointmentId, { userId: userId, memberId: memberId, date: date });
    return response;
  } catch (err) {
    return err;
  }
}

// TeamMember screen

export async function getMemberAppointments (memberId) {
  try {
    const response = await api.get('/appointments/' + memberId);
    return response;
  } catch (err) {
    return err;
  }
}