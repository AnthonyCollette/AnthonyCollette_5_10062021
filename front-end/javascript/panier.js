let parentSection = document.getElementById("detailpanier");

function cartContent() {
    parentSection.innerHTML = `<div id="cart-content"></div>`;
    let cart = document.getElementById("cart-content");
    let total = 0;

    JSON.parse(localStorage.getItem("Teddies")).forEach((teddy) => {
        let totalPriceProduct = (teddy.price / 100) * teddy.quantity;
        cart.innerHTML += `<div class="productincart">
    <div class="product-wrapper">
    <div class="number-wrapper">
        <a href="" class="plus"></a>
        <span class="quantityofproduct">${teddy.quantity}</span>
        <a href="" class="minus"></a>
    </div>
    <div class="color-name-wrapper">
        <h3>${teddy.name}</h3>
        <h5>${teddy.color}</h5>
    </div>
    </div>
    <div class="product-wrapper">
    <h4>${totalPriceProduct}€</h4>
    <a href="" class="delete-btn">
        <i class="fas fa-times"></i>
    </a>
    </div>
    </div>`;

        total += totalPriceProduct;
    });

    parentSection.innerHTML += `<div id="totalcart"><span id="totaldelacommande">Total de la commande : ${total}€</span>
                        <a href="" id="clearall">Vider mon panier</a></div>`;
}

cartContent();
let cartSection = document.getElementById("totalcart");
let cart = document.getElementById("cart-content");
let plus = document.getElementsByClassName("plus");
let minus = document.getElementsByClassName("minus");
let deleteButton = document.getElementsByClassName("delete-btn");
let teddiesArray = JSON.parse(localStorage.getItem("Teddies"));

for (let i = 0; i < teddiesArray.length; i++) {
    plus[i].addEventListener("click", (event) => {
        event.preventDefault();
        let teddies = [];
        teddies = JSON.parse(localStorage.getItem("Teddies"));
        teddy = teddies[i];
        teddy.quantity += 1;
        localStorage.setItem("Teddies", JSON.stringify(teddies));
        parentSection.innerHTML = ``;
        cartContent();
    });

    minus[i].addEventListener("click", (event) => {
        event.preventDefault();
        let teddies = [];
        teddies = JSON.parse(localStorage.getItem("Teddies"));
        teddy = teddies[i];
        if (teddy.quantity > 1) {
            teddy.quantity -= 1;
            localStorage.setItem("Teddies", JSON.stringify(teddies));
        } else {
            teddies.splice(i, 1);
            localStorage.setItem("Teddies", JSON.stringify(teddies));
        }
        parentSection.innerHTML = ``;
        cartContent();
    });

    deleteButton[i].addEventListener("click", (event) => {
        event.preventDefault();
        let teddies = [];
        teddies = JSON.parse(localStorage.getItem("Teddies"));
        teddy = teddies[i];
        teddies.splice(i, 1);
        localStorage.setItem("Teddies", JSON.stringify(teddies));
        parentSection.innerHTML = ``;
        cartContent();
    });
}

let clearAll = document.getElementById("clearall");

clearAll.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("Teddies");
    parentSection.innerHTML = ``;
    cartContent();
});

let formBtn = document.getElementById("btn-command");

formBtn.addEventListener("click", (event) => {
    event.preventDefault();
});
