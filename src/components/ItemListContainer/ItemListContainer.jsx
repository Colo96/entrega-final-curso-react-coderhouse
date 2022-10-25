import './ItemListContainer.css';
import React, { useState, useEffect } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { listaPeliculas } from '../baseDatos/baseDatos';
import { useParams } from 'react-router-dom';

const films = listaPeliculas;


export const ItemListContainer = () => {
    const [data, setData] = useState([]);

    const {categoriaId} = useParams();

    useEffect(() => {
       const getData = new Promise(resolve => {
        setTimeout(() => {
           resolve(films);
        }, 1000);
       });

       if(categoriaId){
         getData.then(res => setData(res.filter(film => film.category === categoriaId)));
       }else{
         getData.then(res => setData(res));
       }

    }, [categoriaId]);

    return(
        <div className="containerItemList">
          <ItemList data={data}/>
        </div>
    );
}