import './Cart.css';
import React, { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { ItemCart } from '../ItemCart/ItemCart';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';

export const Cart = () => {

    const { cart, totalPrice } = useCartContext();

    const [order, setOrder] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        fecha: serverTimestamp(),
        items: cart.map(product => ({ id: product.id, title: product.title, price: product.price, quantity: product.quantity })),
        total: totalPrice()
    });

    const handleInputChange = (event) => {
        setOrder({
            ...order,
            [event.target.name]: event.target.value
        });
    }

    const validateCamp = (e) => {
          if(e.target.name === 'nombre'){

          }
          if(e.target.value === ''){
             console.log("El campo " + e.target.name + " no puede estar vacio. Ten en cuenta que no se terminara la compra si este campo sigue vacio.");
          }
    }

    const handleClick = () => {
        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');
        addDoc(ordersCollection, order).then(({ id }) => console.log(id));
    }

    if (cart.length === 0) {
        return (
            <div className="container-cart">
                <div className='cart-empty'>
                    <p>
                        No hay elementos en el carrito
                    </p>
                    <Link to='/'>
                        Hacer compras
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-cart">
            <div className='cart-full'>
                {
                    cart.map(product => <ItemCart key={product.id} product={product} />)
                }
                <p>
                    Precio Total: ${totalPrice()}
                </p>
                <h2>
                    Por favor complete el formulario para finalizar la compra
                </h2>
                <form>
                    <label>
                        <span>Nombre:</span><br />
                        <input type="text" name="nombre" placeholder='Nombre' onBlur={validateCamp} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        <span>Apellido:</span><br />
                        <input type="text" name="apellido" placeholder='Apellido' onBlur={validateCamp} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        <span>Teléfono:</span><br />
                        <input type="tel" name="telefono" placeholder='12-3454-6789' pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}" onBlur={validateCamp} onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        <span>Email:</span><br />
                        <input type="email" name="email" placeholder='algo@coldmail.com' onBlur={validateCamp} onChange={handleInputChange} />
                    </label>
                </form>
                <br />
                <button onClick={handleClick}>
                    Emitir compra
                </button>
            </div>
        </div>
    );
}