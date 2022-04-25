document.addEventListener("DOMContentLoaded", function(){
    listaCart()
   
    
})

const cerrarCart = document.getElementById("x-btn")
const cart = document.querySelectorAll(".cart")

cerrarCart.addEventListener("click", () =>{
    cart.forEach(element => {
        /* console.log(element) */
        element.classList.add("hidden")
    })
})


//eliminar empty con button plus
const plusButton = document.getElementById("plus-button")
const cartEmpty = document.querySelectorAll(".empty")
const checkoutButton = document.querySelectorAll(".checkout-button")

plusButton.addEventListener("click", () =>{
    cartEmpty.forEach(element => {
        element.classList.add("hidden")
    })
    /* checkoutButton.forEach(element => {
        element.removeAttribute("disabled")
    }) */

})

//activar button checkout

/* plusButton.addEventListener("click", () =>{
    checkoutButton.forEach(element => {
        element.removeAttribute("disabled") */
        /* element.setAttribute("disabled", "enabled") */
/*     })
}) */


const bagButton = document.getElementById("bag-button")

bagButton.addEventListener("click", ()=>{
    cart.forEach(element => {
         element.classList.remove("hidden")
    })
})

function addProductInner(){
    precio = document.getElementById('price-' +id).innerHTML
        precio = precio.slice(1, -1)
        const product = {
            'id' : id,
            'name' :  document.getElementById('name-' +id).innerHTML,
            'price' : precio,
            "image" : document.getElementById('img-' +id).src,
            "qty" : 1
        }
        items.push(product)
}

function addProduct(id){
    
    const cart = document.getElementById("cart")
    const items = getCart();
    let existe = false;
    if(items.length>0){ //si ya hay productos
        items.forEach(item =>{
            if(item.id == id){
                item.qty += 1;
                existe = true
            }
        })

        if(!existe){
              
            precio = document.getElementById('price-' +id).innerHTML
            precio = precio.slice(1, -1)
            const product = {
                'id' : id,
                'name' :  document.getElementById('name-' +id).innerHTML,
                'price' : precio,
                "image" : document.getElementById('img-' +id).src,
                "qty" : 1
            }
            items.push(product) 
        }

    }else{ //esta vacio
        
        precio = document.getElementById('price-' +id).innerHTML
        precio = precio.slice(1, -1)
        const product = {
            'id' : id,
            'name' :  document.getElementById('name-' +id).innerHTML,
            'price' : precio,
            "image" : document.getElementById('img-' +id).src,
            "qty" : 1
        }
        items.push(product)
    }
    localStorage.setItem('productos', JSON.stringify(items));
    listaCart();
    const btnChk = document.getElementById('cart-checkout')
    btnChk.removeAttribute("disabled")
    //agregar
    
    /* cart.classList.remove("hidden") */

}


// obtener todos los elementos del carrito
function getCart(){
    let products;
    if(localStorage.getItem('productos') === null){ //si esta vacio
        products = [];
    }else{
        products = JSON.parse(localStorage.getItem('productos'));
    }
    return products;
}

function listaCart(){
    const items = getCart();
    if(items.length>0){
        let tmpHtml = '';
        const cuerpo = document.getElementById('cart-body');
        cuerpo.innerHTML = '';
        total  = 0;
        items.forEach( item => {
            importe = (Number(item.price) * Number(item.qty))
            total  +=  importe
            const fila = document.createElement('div')
            fila.className = "card-nueva";
            fila.innerHTML = `<div class="card-cont"><img src='${item.image}'></div>
            <div class="card-info">
            <h2 class="card-title">${item.name}</h2>
            <p class="card-price">$${item.price}0</p>
            <p class="cart-subtotal">Subtotal: $${importe}.00</p>
            <div class="card-qty">
                <div class="card-qty-content">
                    <span class="cart-qty-box minus">
                        <img src="./assets/images/minus.png" alt="" onclick="removeProduct(${item.id})">
                    </span>
                    <p>${item.qty} units</p>
                    <span class="cart-qty-box plus">
                        <img src="./assets/images/plus.png" alt="" class="plus-cart" onclick="addProduct(${item.id})">
                    </span>
                </div>
            </div>
            </div>`;
            cuerpo.appendChild(fila);
        })  
        
        const f  = document.createElement('div')
        f.innerHTML = `<strong>Total: $${total}.00</strong>`
        cuerpo.appendChild(f);
    }else{
        const cuerpo = document.getElementById('cart-body');
        const fila = document.createElement('div')
        fila.className = "cart-empty empty";
        fila.innerHTML = `
                <img src="./assets/images/bag.png" alt="">
                <h2>Let´s add something</h2>
                <p>
                    You can add items by clicking on the "+" button on the product page
                </p>
            </div>
            <div class="cart-prices empty">
                <span class="cart-prices-item">
                    <span id="items-count">0</span> items
                </span>
                <span class="cart-prices-total" id="cart-total">$0.00</span>`
                cuerpo.appendChild(fila);
            }

}


function removeProduct(id){
    const cart = document.getElementById("cart")
    const items = getCart();
    if(items.length>0){ //si ya hay productos
        items.forEach(item => {
            if(item.id == id){
                item.qty -= 1
            }
        })
        localStorage.setItem('productos', JSON.stringify(items));
        listaCart()
    }

}

