const product = [
    {
        id: 0,
        image: 'sellou.jpg',
        title: 'sellou',
        price: 80,
    },
    {
        id: 1,
        image: 'briwat.jpg',
        title: 'Briwat',
        price: 90,
    },
    {
        id: 2,
        image: 'chabakia.jpg',
        title: 'Chabakia',
        price: 50,
    },
    {
        id: 3,
        image: 'mhalabia.jpg',
        title: 'Mhalabia',
        price: 100,
    }
];

    let i=0;
document.getElementById('root').innerHTML = product.map((item)=>
{
    
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${item.image}></img>
            </div>
        <div class='bottom'>
        <p>${item.title}</p>
        <h2>DH ${item.price}.00</h2>`+
        "<button id= btn onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
    
    
}).join('')



var cart = [];

function addtocart(a) {
    const itemToAdd = { ...product[a], quantity: 1 };
    const existingItemIndex = cart.findIndex(item => item.id === itemToAdd.id);
    if (existingItemIndex === -1) {
        cart.push(itemToAdd);
    } else {
        alert("Please adjust the quantity using the + and - buttons.");
    }
    displaycart();
}

function delElement(index) {
    cart.splice(index, 1);
    displaycart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        displaycart();
    }
}

function increaseQuantity(index) {
    cart[index].quantity++;
    displaycart();
}

function displaycart() {
    let total = 0;
    let countt =0;
    const cartItemContainer = document.getElementById("cartItem");
    const totalElement = document.getElementById("total");
   
    while (cartItemContainer.firstChild) {
        cartItemContainer.removeChild(cartItemContainer.firstChild);
    }
    if (cart.length === 0) {
        cartItemContainer.textContent = "Your cart is empty";
        totalElement.textContent = "DH " + 0 + ".00";
    } else {
        cart.forEach((item, index) => {
            const { image, title, price, quantity } = item;
            console.log(image);
            total += price * quantity;
            totalElement.textContent = "DH " + total.toFixed(2);
            countt = countt + quantity;
            const countElement = document.getElementById("count");
            countElement.textContent = countt ;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            const rowImg = document.createElement("div");
            rowImg.classList.add("row-img");
            const img = document.createElement("img");
            img.classList.add("rowimg");

            img.src= image;

            rowImg.appendChild(img)
            const titleParagraph = document.createElement("p");
            titleParagraph.textContent = title;
            titleParagraph.style.fontSize = "12px";
            const priceHeading = document.createElement("h2");
            priceHeading.textContent = "DH " + (price * quantity).toFixed(2);
            priceHeading.style.fontSize = "15px";
            const decreaseButton = document.createElement("button");
            decreaseButton.textContent = "-";
            decreaseButton.classList.add("quantity-button");
            decreaseButton.addEventListener("click", () => decreaseQuantity(index));
            const increaseButton = document.createElement("button");
            increaseButton.textContent = "+";
            increaseButton.classList.add("quantity-button");
            increaseButton.addEventListener("click", () => increaseQuantity(index));
            const quantitySpan = document.createElement("span");
            quantitySpan.textContent = quantity;
            quantitySpan.classList.add("quantity-span");

            const deleteButton = document.createElement("img");
            deleteButton.src= "de.png";
            deleteButton.classList.add("delete");
            deleteButton.addEventListener("click", () => delElement(index));
            cartItem.appendChild(rowImg);
            cartItem.appendChild(titleParagraph);
            cartItem.appendChild(priceHeading);
            cartItem.appendChild(decreaseButton);
            cartItem.appendChild(quantitySpan);
            cartItem.appendChild(increaseButton);
            cartItem.appendChild(deleteButton);
            cartItemContainer.appendChild(cartItem);
            
        });
    }
}
