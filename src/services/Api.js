import { create } from 'apisauce';

const api = create ({
    baseURL: 'http://192.168.1.14:3333',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

api.addResponseTransform(response => {
    if(!response.ok) throw response;
});

export default api;