const botonesDelCarrito = document.querySelectorAll(".agregarAlCarrito");
botonesDelCarrito.forEach(botonesCarrito => {
    botonesCarrito.addEventListener('click', clickBotonCarrito)
});

const botonComprar = document.querySelector('.comprarButton');
botonComprar.addEventListener('click', botonComprarClick)


const carritoItemCont = document.querySelector('.shoppingCartItemsContainer')
  
function clickBotonCarrito(e) {
    const boton = e.target;
    const card = boton.closest('.card')

    const cardTitulo = card.querySelector('.card-title').textContent;
    const cardPrecio = card.querySelector('.listaProd__precio').textContent;
    const cardImg = card.querySelector('.card-img-top').src;
 
    añadirItemsCarrito(cardTitulo, cardPrecio, cardImg);
}

function añadirItemsCarrito(cardTitulo, cardPrecio, cardImg) {

    const tituloElemento = carritoItemCont.getElementsByClassName('shoppingCartItemTitle');

    for (let i = 0; i < tituloElemento.length; i++){
        if (tituloElemento[i].innerText === cardTitulo) {
            let cantidadElemento = tituloElemento[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            cantidadElemento.value++;
            actualizarTotal();
            return;
        }
    };
        
    

    const carritoFila = document.createElement('div');
    const carritoContenedor = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${cardImg} class="shopping-cart-image" width="100px">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${cardTitulo}</h6>
            </div>
        </div>

        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${cardPrecio}</p>
            </div>
        </div>
    
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
</div>`;
    carritoFila.innerHTML = carritoContenedor
    carritoItemCont.append(carritoFila);
    
    carritoFila.querySelector('.buttonDelete').addEventListener('click', borrarItemCarrito);

    carritoFila.querySelector('.shoppingCartItemQuantity').addEventListener('change', elementoChange)


    actualizarTotal()
}

function actualizarTotal() {
    let total = 0;
    const carritoTotal = document.querySelector('.totalCarrito')
    
    const carritoItems = document.querySelectorAll('.shoppingCartItem')
    
    carritoItems.forEach(shoppingCartItem => {
        const carritoPrecioElemento = shoppingCartItem.querySelector('.shoppingCartItemPrice');

        const precioCarrito = Number(carritoPrecioElemento.textContent.replace("$", " "));
        const carritoCantidadElemento = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        
        const carritoCantidad = Number(carritoCantidadElemento.value);

        total = total + precioCarrito * carritoCantidad;
    });
    carritoTotal.innerHTML = `${total.toFixed(2)}$`
}

function borrarItemCarrito(e) {
    const clickBoton = e.target;
    clickBoton.closest('.shoppingCartItem').remove();
    actualizarTotal();
}


function elementoChange(e) {
    const input = e.target
    if (input.value <= 0) {
        input.value = 1;
    }

    actualizarTotal();
}

function botonComprarClick() {
    carritoItemCont.innerHTML = "";
    actualizarTotal();
}