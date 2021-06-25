var parentSection = document.getElementById("detailpanier");
parentSection.innerHTML = `<div id="cart-content"></div>`;
var cart = document.getElementById("cart-content");
var total = 0;
var totalPriceProduct;

function printCart() {
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
}

printCart();

var cartSection = document.getElementById("totalcart");
var plus = document.getElementsByClassName("plus");
var minus = document.getElementsByClassName("minus");
var deleteButton = document.getElementsByClassName("delete-btn");
var teddiesArray = JSON.parse(localStorage.getItem("Teddies"));

function changeQuantity() {
    for (let i = 0; i < teddiesArray.length; i++) {
        plus[i].addEventListener("click", (event) => {
            event.preventDefault();

            // Récupère le array dans le local storage

            let teddies = [];
            teddies = JSON.parse(localStorage.getItem("Teddies"));

            // Modifie la quantité

            let teddyName = event.target.parentElement.parentElement.getElementsByTagName("h3");
            let teddyColor = event.target.parentElement.parentElement.getElementsByTagName("h5");
            let teddyQuantity = event.target.parentElement.parentElement.getElementsByClassName("quantityofproduct");
            let actualTeddy = teddies.filter((teddy) => teddy.name == teddyName[0].innerHTML && teddy.color == teddyColor[0].innerHTML);
            actualTeddy[0].quantity++;
            for (let i = 0; i < teddyQuantity.length; i++) {
                teddyQuantity[i].innerHTML = actualTeddy[0].quantity;
            }

            // Modifie le prix de l'ourson

            let priceProductUI = event.target.parentElement.parentElement.parentElement.getElementsByClassName("totalpriceproduct");
            totalPriceProduct = (actualTeddy[0].price / 100) * actualTeddy[0].quantity;
            for (let i = 0; i < priceProductUI.length; i++) {
                priceProductUI[i].innerHTML = totalPriceProduct + `€`;
            }

            // Modifie le prix total de la commande

            total += actualTeddy[0].price / 100;
            document.getElementById("totaldelacommande").innerHTML = "Total de la commande : " + total + "€";
            localStorage.setItem("Montant Total", total);

            // Renvoie le array dans le local storage

            localStorage.setItem("Teddies", JSON.stringify(teddies));
        });

        minus[i].addEventListener("click", (event) => {
            event.preventDefault();

            // Récupère le array dans le local storage

            let teddies = [];
            teddies = JSON.parse(localStorage.getItem("Teddies"));

            // Modifie la quantité

            let teddyName = event.target.parentElement.parentElement.getElementsByTagName("h3");
            let teddyColor = event.target.parentElement.parentElement.getElementsByTagName("h5");
            let teddyQuantity = event.target.parentElement.parentElement.getElementsByClassName("quantityofproduct");
            let actualTeddy = teddies.filter((teddy) => teddy.name == teddyName[0].innerHTML && teddy.color == teddyColor[0].innerHTML);
            actualTeddy[0].quantity--;
            for (let i = 0; i < teddyQuantity.length; i++) {
                teddyQuantity[i].innerHTML = actualTeddy[0].quantity;
            }

            // Modifie le prix de l'ourson

            let priceProductUI = event.target.parentElement.parentElement.parentElement.getElementsByClassName("totalpriceproduct");
            totalPriceProduct = (actualTeddy[0].price / 100) * actualTeddy[0].quantity;
            for (let i = 0; i < priceProductUI.length; i++) {
                priceProductUI[i].innerHTML = totalPriceProduct + `€`;
            }

            // Modifie le prix total de la commande

            total -= actualTeddy[0].price / 100;
            document.getElementById("totaldelacommande").innerHTML = "Total de la commande : " + total + "€";
            localStorage.setItem("Montant Total", total);

            // Renvoie le array dans le local storage

            localStorage.setItem("Teddies", JSON.stringify(teddies));
        });

        deleteButton[i].addEventListener("click", (event) => {
            event.preventDefault();

            // Récupère le array dans le local storage

            let teddies = [];
            teddies = JSON.parse(localStorage.getItem("Teddies"));

            // Réduction du montant total de la commande

            let teddyName = event.target.parentElement.parentElement.parentElement.getElementsByTagName("h3");
            let teddyColor = event.target.parentElement.parentElement.parentElement.getElementsByTagName("h5");
            let actualTeddy = teddies.filter((teddy) => teddy.name == teddyName[0].innerHTML && teddy.color == teddyColor[0].innerHTML);
            total -= (actualTeddy[0].price / 100) * actualTeddy[0].quantity;
            document.getElementById("totaldelacommande").innerHTML = "Total de la commande : " + total + "€";

            // Suppression de l'ourson
            let veryActualTeddy = teddies.find((element) => element.name === teddyName[0].innerHTML && element.color === teddyColor[0].innerHTML);
            console.log(veryActualTeddy);
            let index = teddies.indexOf(veryActualTeddy);
            console.log(index);
            event.target.parentElement.parentElement.parentElement.remove();
            teddies.splice(index, 1);

            // Renvoie le array dans le local storage

            localStorage.setItem("Teddies", JSON.stringify(teddies));
            localStorage.setItem("Montant Total", total);

            // total -= (teddies[i].price / 100) * teddies[i].quantity;
            // // document.getElementsByClassName("productincart")[i].remove();
            // teddies.splice(i, 1);
            // localStorage.setItem("Teddies", JSON.stringify(teddies));
            // document.getElementById("totaldelacommande").innerHTML = "Total de la commande : " + total + "€";
            // localStorage.setItem("Montant Total", total);
        });
    }
}

changeQuantity();

function clearCart() {
    let clearAll = document.getElementById("clearall");

    clearAll.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("cart-content").remove();
        localStorage.removeItem("Teddies");
        document.getElementById("totaldelacommande").innerHTML = "Il n'y a rien dans votre panier !";
    });
}

clearCart();
