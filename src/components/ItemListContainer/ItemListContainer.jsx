import './ItemListContainer.css';
import React, { useState, useEffect } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';


export const ItemListContainer = () => {
    const [data, setData] = useState([]);

    const {categoriaId} = useParams();

    useEffect(() => {
      const querydb = getFirestore();
      const querycollection = collection(querydb, 'products');
      
      if(categoriaId){
        const queryFilter = query(querycollection, where('category', '==', categoriaId));
        getDocs(queryFilter).then(res => setData(res.docs.map(product => ({id: product.id, ...product.data()}))));
      }else{
        getDocs(querycollection).then(res => setData(res.docs.map(product => ({id: product.id, ...product.data()}))));   
      }

    }, [categoriaId]);

    return(
        <div className="containerItemList">
          <ItemList data={data}/>
        </div>
    );
}