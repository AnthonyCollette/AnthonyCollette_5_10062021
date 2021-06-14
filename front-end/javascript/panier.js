var parentSection = document.getElementById("detailpanier");
parentSection.innerHTML = `<div id="cart-content"></div>`;
var cart = document.getElementById("cart-content");
var total = 0;
var totalPriceProduct;

if (localStorage.getItem("Teddies") === null) {
    parentSection.innerHTML += `<div id="totalcart"><span id="totaldelacommande">Votre panier est vide !</span></div>`;
} else {
    JSON.parse(localStorage.getItem("Teddies")).forEach((teddy) => {
        totalPriceProduct = (teddy.price / 100) * teddy.quantity;
        const product = document.createElement("div");
        product.classList.add("productincart");

        product.innerHTML = `<div class="product-wrapper">
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
         <span class="totalpriceproduct">${totalPriceProduct}€</span>
         <a href="" class="delete-btn">
             <i class="fas fa-times"></i>
         </a>
         </div>`;

        cart.appendChild(product);
        total += totalPriceProduct;
        localStorage.setItem("Montant Total", total);
    });

    parentSection.innerHTML += `<div id="totalcart"><span id="totaldelacommande">Total de la commande : ${total}€</span>
                        <a href="" id="clearall">Vider mon panier</a></div>`;
}

// cartContent();
var cartSection = document.getElementById("totalcart");
var plus = document.getElementsByClassName("plus");
var minus = document.getElementsByClassName("minus");
var deleteButton = document.getElementsByClassName("delete-btn");
var teddiesArray = JSON.parse(localStorage.getItem("Teddies"));

for (let i = 0; i < teddiesArray.length; i++) {
    plus[i].addEventListener("click", (event) => {
        event.preventDefault();
        let teddies = [];
        teddies = JSON.parse(localStorage.getItem("Teddies"));
        teddies[i].quantity++;
        totalPriceProduct = (teddies[i].price / 100) * teddies[i].quantity;
        total += teddies[i].price / 100;
        localStorage.setItem("Teddies", JSON.stringify(teddies));
        document.getElementsByClassName("quantityofproduct")[i].innerHTML = teddies[i].quantity;
        document.getElementsByClassName("totalpriceproduct")[i].innerHTML = totalPriceProduct + `€`;
        document.getElementById("totaldelacommande").innerHTML = "Total de la commande : " + total + "€";
        localStorage.setItem("Montant Total", total);
    });

    minus[i].addEventListener("click", (event) => {
        event.preventDefault();
        let teddies = [];
        teddies = JSON.parse(localStorage.getItem("Teddies"));
        teddy = teddies[i];
        if (teddy.quantity > 1) {
            teddies[i].quantity--;
            totalPriceProduct = (teddies[i].price / 100) * teddies[i].quantity;
            localStorage.setItem("Teddies", JSON.stringify(teddies));
            total -= teddies[i].price / 100;
            document.getElementsByClassName("quantityofproduct")[i].innerHTML = teddies[i].quantity;
            document.getElementsByClassName("totalpriceproduct")[i].innerHTML = totalPriceProduct + `€`;
            document.getElementById("totaldelacommande").innerHTML = "Total de la commande : " + total + "€";
            localStorage.setItem("Montant Total", total);
        } else {
            document.getElementsByClassName("productincart")[i].remove();
            teddies.splice(i, 1);
            localStorage.setItem("Teddies", JSON.stringify(teddies));
            document.getElementById("totaldelacommande").innerHTML = "Total de la commande : " + total + "€";
            localStorage.setItem("Montant Total", total);
        }
    });

    deleteButton[i].addEventListener("click", (event) => {
        event.preventDefault();
        let teddies = [];
        teddies = JSON.parse(localStorage.getItem("Teddies"));
        total -= (teddies[i].price / 100) * teddies[i].quantity;
        document.getElementsByClassName("productincart")[i].remove();
        teddies.splice(i, 1);
        localStorage.setItem("Teddies", JSON.stringify(teddies));
        document.getElementById("totaldelacommande").innerHTML = "Total de la commande : " + total + "€";
        localStorage.setItem("Montant Total", total);
    });
}

let clearAll = document.getElementById("clearall");

clearAll.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("cart-content").remove();
    localStorage.removeItem("Teddies");
    document.getElementById("totaldelacommande").innerHTML = "Il n'y a rien dans votre panier !";
});
