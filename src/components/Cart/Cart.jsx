import './Cart.css';
import React, {useState} from 'react';
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

    const handleInputChange  = (event) => {
        setOrder({
            ...order,
            [event.target.name] : event.target.value
        });
    }

    const handleClick = () => {
        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');
        addDoc(ordersCollection, order).then(({ id }) => console.log(id));
    }

    if (cart.length === 0) {
        return (
            <>
                <p>
                    No hay elementos en el carrito
                </p>
                <Link to='/'>
                    Hacer compras
                </Link>
            </>
        );
    }

    return (
        <>
            {
                cart.map(product => <ItemCart key={product.id} product={product} />)
            }
            <p>
                Precio Total: ${totalPrice()}
            </p>
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
                    <input type="text" name="telefono" placeholder='Teléfono' onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    <span>Email:</span><br />
                    <input type="email" name="email" placeholder='Email'  onChange={handleInputChange} />
                </label>
            </form>
            <br />
            <button onClick={handleClick}>
                Emitir compra
            </button>
        </>
    );
}