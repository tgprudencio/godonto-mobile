import { create } from 'apisauce';

const api = create ({
    baseURL: 'http://localhost:3333',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

api.addResponseTransform(response => {
    if(!response.ok) throw response;
});

export default api;