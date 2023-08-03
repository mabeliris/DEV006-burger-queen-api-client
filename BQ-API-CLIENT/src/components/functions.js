import axios from 'axios';

export async function login(email, password) {
    const { data } = await axios.post('http://localhost:8080/login', {
        email,
        password
    });
    console.log(data)
    return data;
};

export async function getProducts(token) {
    const response = await axios.get('http://localhost:8080/products', {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    const products = response.data;
    console.log(products)
    return products;
};

export function filterByProduct(products, type) {
    const filteredProducts = products.filter((product) =>
        product.type === type
    );
    return filteredProducts
}


export function filter(data, condition) {
    const filteredProducts = filterByProduct(data, condition);
    const cardsProducts = document.querySelector('.cards');
    cardsProducts.innerHTML = '';
    filteredProducts.forEach(product => {
        const p = product;
        console.log(product)
    })
}




