async function createCart() {
  const response = await fetch('/api/carts', {
    method: 'post'
  })
  const body = await response.json()
  return body.data
}

async function addToCart(pid) {
  try {
    
    let carritoEnElLocalNoExiste = localStorage.getItem("cartId")

    if(!carritoEnElLocalNoExiste){
    const auxCart = await createCart();
    const idCart = auxCart._id
    localStorage.setItem("cartId", JSON.stringify(auxCart));

    const response = await fetch(`/api/carts/${idCart}/product/${pid}`, {
      method: "PUT"
    });

       if (response.ok) {
      alert('Producto agregado al carrito');
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
    }

    if(carritoEnElLocalNoExiste){
      const auxCart = localStorage.getItem("cartId")

      const parsedCart = JSON.parse(auxCart)
     
      const idCart = parsedCart._id
      
      const response = await fetch(`/api/carts/${idCart}/product/${pid}`, {
        method: "PUT"
      });
  
         if (response.ok) {
        alert('Producto agregado al carrito');
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    }

  } catch(err) {
    console.log(err);
  }
}


