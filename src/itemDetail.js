import React, {useState, useEffect } from 'react';
 
// match é um parametro reservado do react que armazena as informações do :id 
function ItemDetail({match}) {
    useEffect(function() {
      fetchItem();
    },[]);

    let [item,setItem] = useState({
      // nesse caso precisa declarar estes objetos (usados no return) para não acessarmos atributos de undefined
      item: {
        images:{}
      }
    });

    const fetchItem = async function(){
      const fetchItem = await fetch(`https://fortnite-api.theapinetwork.com/item/get?id=${match.params.id}`);
      const item = await fetchItem.json();
      setItem(item.data);
    }

    
  return (
    <div class="shop-items">
      <h1>{item.item.name}</h1>
      <img src={item.item.images.background}/>
    </div>
  );
}

export default ItemDetail;
