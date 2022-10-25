import './ItemDetail.css';
import React, {useState} from 'react';
import { ItemCount } from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

export const ItemDetail = ({data}) => {

    const [goToCart, setGoToCart] = useState(false);

    const {addProduct} = useCartContext();

    const onAdd = (quantity) => {
        setGoToCart(true);
        addProduct(data, quantity);
    }

    return(
        <div className="containerDeatil">
            <div className="detail">
                 <img className='detail__image' src={data.image} alt={data.title}/>
                 <div className='contentDetail'>
                      <h1>
                        {data.title}
                      </h1>
                      <p>
                        {data.abstract}
                      </p>
                      {
                        goToCart
                        ? <Link className="endCompra" to='/cart'>Terminar Compra</Link>
                        : <ItemCount initial={1} stock={5} onAdd={onAdd}/>
                      }
                 </div>
            </div>
        </div>
    );
}