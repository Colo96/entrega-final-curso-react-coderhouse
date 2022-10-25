import './ItemDetailContainer.css';
import React, {useState, useEffect} from 'react';
import { ItemDetail } from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { listaPeliculas } from '../baseDatos/baseDatos';

const films = listaPeliculas;

export const ItemDetailContainer = () => {
    const [data, setData] = useState({});

    const {detalleId} = useParams();

    useEffect(() => {
        const getData = new Promise(resolve => {
            setTimeout(() => {
                resolve(films);
            }, 1000);
        });
        getData.then(res => setData(res.find(film => film.id === parseInt(detalleId))));
    }, [detalleId]);

    return(
        <div className="containerItemDetail">
          <ItemDetail data={data}/>
        </div>
    );
}