import axios from 'axios';

export async function login (email, password) {
    const { data } = await axios.post('http://localhost:8080/login', {
        email, 
        password
    });
    console.log(data)
    return data;
};

export async function getProducts (token) {
    const response = await axios.get('http://localhost:8080/products', {
        headers:{
            Authorization:"Bearer " + token
        }
    });
    return response.data;
};
