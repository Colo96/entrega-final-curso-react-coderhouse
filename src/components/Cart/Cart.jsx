import './Cart.css';
import React, { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { ItemCart } from '../ItemCart/ItemCart';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import swAlert from 'sweetalert';

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

    const handleClick = () => {

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');

        if (order.nombre === '' || order.apellido === '' || order.email === '' || order.telefono === '') {
            swAlert({
                icon: "error",
                title: "Los campos no pueden estar vacios",
            });
            return;
        }

        if (order.email !== '' && !regexEmail.test(order.email)) {
            swAlert({
                icon: "warning",
                title: "Debes escribir una direccion de correo electronico valida",
            });
            return;
        }

        if (order.telefono !== '' && !regexPhone.test(order.telefono)) {
            swAlert({
                icon: "warning",
                title: "Debes escribir un teléfono valido",
            });
            return;
        }

        if ((order.telefono !== '' && regexPhone.test(order.telefono)) && (order.email !== '' && regexEmail.test(order.email))) {
            addDoc(ordersCollection, order).then(({ id }) => console.log(id));
            swAlert({
                icon: "success",
                title: "Realizaste la compra correctamente",
            });
            //cart.length = 0;
        }
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
                        <input type="text" name="nombre" placeholder='Nombre' onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        <span>Apellido:</span><br />
                        <input type="text" name="apellido" placeholder='Apellido' onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        <span>Teléfono:</span><br />
                        <input type="tel" name="telefono" placeholder='12-3454-6789' onChange={handleInputChange} />
                    </label>
                    <br />
                    <label>
                        <span>Email:</span><br />
                        <input type="email" name="email" placeholder='algo@coldmail.com' onChange={handleInputChange} />
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