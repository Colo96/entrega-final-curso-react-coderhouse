import './ItemDetailContainer.css';
import React, {useState, useEffect} from 'react';
import { ItemDetail } from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const ItemDetailContainer = () => {
    const [data, setData] = useState({});

    const {detalleId} = useParams();

    useEffect(() => {
       const querydb = getFirestore();
       const querydoc = doc(querydb, 'products', detalleId);
       getDoc(querydoc).then(res => setData({id: res.id, ...res.data()}));
    }, [detalleId]);

    return(
        <div className="containerItemDetail">
          <ItemDetail data={data}/>
        </div>
    );
}