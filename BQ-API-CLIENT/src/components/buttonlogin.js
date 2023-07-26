import axios from 'axios';

export async function login (email, password) {
    const { data } = await axios.post('http://localhost:8080/login', {
        email, 
        password
    });
    console.log(data)
    return data;
};
