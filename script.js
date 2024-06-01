// Classe Product pour encapsuler les détails d'un produit
class Product {
    constructor(id, title, price, image) {
        this.id = id; // Identifiant unique du produit
        this.title = title; // Nom du produit
        this.price = price; // Prix du produit
        this.image = image; // Image du produit
    }
}

// Classe ShoppingCartItem pour encapsuler un produit dans le panier et gérer sa quantité
class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product; // Instance de la classe Product
        this.quantity = quantity; // Quantité du produit dans le panier
    }

    // Méthode pour calculer le prix total de l'élément en fonction de la quantité
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Classe ShoppingCart pour gérer les éléments du panier
class ShoppingCart {
    constructor() {
        this.items = []; // Tableau pour stocker les instances de ShoppingCartItem
    }

    // Méthode pour ajouter un produit au panier
    addItem(product) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity++; // Augmente la quantité si le produit est déjà dans le panier
        } else {
            this.items.push(new ShoppingCartItem(product)); // Ajoute un nouveau produit au panier
        }
        this.displayCart(); // Met à jour l'affichage du panier
    }

    // Méthode pour supprimer un produit du panier
    removeItem(index) {
        this.items.splice(index, 1); // Supprime l'élément du tableau items
        this.displayCart(); // Met à jour l'affichage du panier
    }

    // Méthode pour augmenter la quantité d'un produit dans le panier
    increaseQuantity(index) {
        this.items[index].quantity++;
        this.displayCart(); // Met à jour l'affichage du panier
    }

    // Méthode pour diminuer la quantité d'un produit dans le panier
    decreaseQuantity(index) {
        if (this.items[index].quantity > 1) {
            this.items[index].quantity--;
        }
        this.displayCart(); // Met à jour l'affichage du panier
    }

    // Méthode pour obtenir le nombre total d'articles dans le panier
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Méthode pour obtenir le prix total des articles dans le panier
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Méthode pour afficher les éléments du panier et mettre à jour l'interface utilisateur
    displayCart() {
        const cartItemContainer = document.getElementById("cartItem");
        const totalElement = document.getElementById("total");
        const countElement = document.getElementById("count");

        cartItemContainer.innerHTML = ''; // Vide le conteneur des éléments du panier

        if (this.items.length === 0) {
            cartItemContainer.textContent = "Your cart is empty";
            totalElement.textContent = "DH 0.00";
            countElement.textContent = 0;
        } else {
            let total = 0;
            let itemCount = 0;

            this.items.forEach((item, index) => {
                total += item.getTotalPrice();
                itemCount += item.quantity;

                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");

                // Utilisation de innerHTML pour créer les éléments du panier
                cartItem.innerHTML = `
                    <div class='row-img'>
                        <img class='rowimg' src='${item.product.image}' alt='${item.product.title}' />
                    </div>
                    <p style='font-size: 12px;'>${item.product.title}</p>
                    <h2 style='font-size: 15px;'>DH ${item.getTotalPrice().toFixed(2)}</h2>
                    <button class='quantity-button' onclick='cart.decreaseQuantity(${index})'>-</button>
                    <span class='quantity-span'>${item.quantity}</span>
                    <button class='quantity-button' onclick='cart.increaseQuantity(${index})'>+</button>
                    <img src='de.png' class='delete' onclick='cart.removeItem(${index})' />
                `;

                cartItemContainer.appendChild(cartItem); // Ajoute l'élément du panier au conteneur
            });

            totalElement.textContent = `DH ${total.toFixed(2)}`;
            countElement.textContent = itemCount;
        }
    }
}
// Création des instances de produits
const products = [
    new Product(0, 'Sellou', 80, 'sellou.jpg'),
    new Product(1, 'Briwat', 90, 'briwat.jpg'),
    new Product(2, 'Chabakia', 50, 'chabakia.jpg'),
    new Product(3, 'Mhalabia', 100, 'mhalabia.jpg')
];

// Création d'une instance de ShoppingCart
const cart = new ShoppingCart();

// Rendu des produits sur la page
const rootElement = document.getElementById('root');
rootElement.innerHTML = products.map((product, index) => `
    <div class='box'>
        <div class='img-box'>
            <img class='images' src='${product.image}' alt='${product.title}' />
        </div>
        <div class='bottom'>
            <p>${product.title}</p>
            <h2>DH ${product.price}.00</h2>
            <button id='btn' onclick='cart.addItem(products[${index}])'>Add to cart</button>
        </div>
    </div>
`).join('');
