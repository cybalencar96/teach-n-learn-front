import React, {useState, useEffect } from 'react';
import {Link } from 'react-router-dom';

function Shop() {
    useEffect(function() {
        fetchItems();
    },[]);

    let [items,setItems] = useState([]);

    const fetchItems = async function() {
        const data = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get');

        items = await data.json();
        items = items.data
        setItems(items);
    }

    
  return (
    <div className="shop-items">
      {items.map(item => (
          <h1 key={item.itemId} className='black'>
              <Link to={`/shop/${item.itemId}`}>{item.item.name}</Link>
          </h1>
      ))}
    </div>
  );
}

export default Shop;
