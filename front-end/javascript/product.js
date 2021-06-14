const article = document.getElementById("detailproduct");
let id = new URL(document.location.href).searchParams.get("id");

function getProduct() {
    fetch("http://localhost:3000/api/teddies/" + id)
        .then((res) => res.json())
        .then((product) => {
            let name = product.name;
            let price = product.price;
            article.innerHTML += `
            <div class="img-product-wrapper">
                <img src="${product.imageUrl}" alt="">
            </div> 
            <div class="infos">
                <h2>${name}</h2>
                <div class="color-wrapper">
                    <label id="color-selection">Couleur choisie</label>
                    <select name="colors" id="color-select">
                    </select>
                </div>
                <p class="description">${product.description}</p>
                <div class="btn-and-price">
                    <div class="btn-wrapper">
                        <button id="buy"><i class="fas fa-shopping-basket"></i></button>
                        <div class="button-effect">Ajouter au panier</div>
                    </div>
                    <h3>${price / 100}€</h3>
                </div>
            </div>
            `;
            const colorSelect = document.getElementById("color-select");

            for (let i = 0; i < product.colors.length; i++) {
                let opt = document.createElement("option");
                opt.value = product.colors[i];
                opt.innerHTML = product.colors[i];
                colorSelect.appendChild(opt);
            }

            const buy = document.getElementById("buy");

            buy.addEventListener("click", () => {
                let color = colorSelect.options[colorSelect.selectedIndex].value;
                let teddy = {
                    name,
                    price,
                    color,
                    id,
                };

                if (localStorage.getItem("Teddies") === null) {
                    let teddies = [];
                    teddy.quantity = 1;
                    teddies.push(teddy);
                    localStorage.setItem("Teddies", JSON.stringify(teddies));
                } else {
                    if (JSON.parse(localStorage.getItem("Teddies")).some((teddy) => teddy.name === name && teddy.color === color)) {
                        let teddies = [];
                        teddies = JSON.parse(localStorage.getItem("Teddies"));
                        // teddy = JSON.parse(localStorage.getItem("Teddies")).find((teddy) => teddy.name === name && teddy.color === color);
                        teddy = teddies.find((teddy) => teddy.name === name && teddy.color === color);
                        teddy.quantity += 1;
                        localStorage.setItem("Teddies", JSON.stringify(teddies));
                    } else {
                        let teddies = [];
                        teddies = JSON.parse(localStorage.getItem("Teddies"));
                        teddy.quantity = 1;
                        teddies.push(teddy);
                        localStorage.setItem("Teddies", JSON.stringify(teddies));
                    }
                }
            });
        })
        .catch((err) => console.log(err));
}

getProduct();
