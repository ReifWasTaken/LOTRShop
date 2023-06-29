
async function addToCart(pid) {

  
  const response = await fetch(`/api/carts/649cfc9482068ac057a54c48/product/${pid}`, {
    method: "PUT"
  })

  if (response.ok) {
    alert('Producto agregado al carrito')
  } else {
    alert((await response.json()).error)
  }
}

