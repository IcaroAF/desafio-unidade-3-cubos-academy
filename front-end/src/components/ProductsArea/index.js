import { Card } from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';
import { formStyles } from '../../styles/formStyles';

function ProductList(){
    
    const classes = formStyles();
    const history = useHistory();
    const { token, setToken } = useContext(AuthContext);
    const [products, setProducts] = useState([]);


    useEffect(()=> {
        async function getProducts(){
            const response = await fetch('http://localhost:3000/produtos', {
            method: "GET",
            mode: 'cors',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
            const userProducts = await response.json();
            setProducts(userProducts)
            
        }

        getProducts();
    }, []);


    return(
        <div className="product-list" >
            {products.map((product)=>
            <Card className="product-card" key={product.id}>
            <img src={product.imagem} alt={product.nome}/>
            <div className="product-info">
                <p>{product.nome}</p>
                <p>{product.descricao}</p>
                <p>{product.estoque}</p>
                <p>{product.preco}</p>
            </div>
            </Card>)}
        </div>

    );
}

export default ProductList;