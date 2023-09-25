async function addToCart(pid) {
  try {
    
    //get the cartID for the user logged in
    const result = await fetch("/api/session/show/cart");
    const data = await result.json();
    if (!data.payload){
      
      return "Coudnt acces to your cart";
    } 
//if the fetch is successfull retrives the data and save the product
    const cartID = data.payload;

    const response = await fetch(`/api/carts/${cartID}/product/${pid}`, {
      method: "PUT"
    });

       if (response.ok) {
      alert('Producto agregado al carrito');
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
    
  } catch(err) {
    console.error('Error parsing JSON:', err);
  }
}


