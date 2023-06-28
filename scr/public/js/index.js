addToCart(()=>{
  console.log("first")
}) 
/*         async function addToCart(pid) {       
          let cartId = localStorage.getItem('cartId')
            if (!cartId) {
              const response = await fetch('/api/carts/', {
                method: 'post'
              })
              const body = await response.json()
              localStorage.setItem('cartId', body.payload)
              cartId = body.payload
            }
            const response = await fetch(`/api/carts/${cartId}/product/${pid}`, {
              method: 'post'
            })
          
            if (response.ok) {
              alert('Producto agregado al carrito')
            } else {
              alert((await response.json()).error)
            }
          } */