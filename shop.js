let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: "Jebba",
        tag: "jebba",
        price: 100,
        inCart: 0
    },
    {
        name: "Chachia",
        tag: "chachia",
        price: 20,
        inCart: 0
    },
    {
        name: "Traditional Dress",
        tag: "traditionaldress",
        price: 50,
        inCart: 0
    },
    {
        name: "Barnous",
        tag: "barnous",
        price: 70,
        inCart: 0
    }
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
} 

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1; 
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price},00 DT</div>
            <div class="quantity">
            <ion-icon name="remove-circle"></ion-icon> 
            <span class="number" >${item.inCart}</span>
            <ion-icon id=${item.tag} onclick='increase(this.id)'  name="add-circle"></ion-icon>             
            </div>
            <div class="total">
                ${item.inCart * item.price},00 DT
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle"> Basket Total </h4>
                <h4 class="basketTotal">
                    ${cartCost},00 DT
                </h4>
            </div>
        
        `
        
        
    }
}
function increase(id){
    let cartItems = localStorage.getItem("totalCost");
    let Items = localStorage.getItem("productsInCart");
    Items = JSON.parse(Items);
    cartItems = JSON.parse(cartItems);
    Object.values(Items).map(item =>{
        if(item.tag == id){
            cartItems = Number(cartItems);
            cartItems+= item.price ;
          
                    localStorage.setItem('totalCost', cartItems ) ;
                    displayCart();
        }

    })

       
}

onLoadCartNumbers();
displayCart();