let products = document.getElementById("products");

// document.addEventListener("DOMContentLoaded", getTeddies);

function getTeddies() {
    fetch("http://localhost:3000/api/teddies")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((teddy) => {
                const productUrl = new URL("product.html", window.location.href);
                productUrl.searchParams.append("id", teddy._id);
                products.innerHTML += `
                     <article class="result">
                         <a href="${productUrl}" class="teddy-link">
                             <div class="wrap-img">
                                 <img src="${teddy.imageUrl}" alt="">
                             </div>
                             <h2>${teddy.name}</h2>
                             <h3>${teddy.price / 100}€</h3>
                         </a>
                     </article>
                     `;
            });
        })
        .catch((err) => console.log(err));
}

getTeddies();
