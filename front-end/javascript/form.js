var formBtn = document.getElementById("btn-command");
var input = document.getElementsByTagName("input");

function checkName() {
    let value = document.getElementById("name").value;
    if (value.length > 2 && value.length < 30 && /^[a-zA-Z]+$/.test(value)) {
        return true;
    } else {
        document.getElementById("name").classList.add("required");
        return false;
    }
}

function checkFirstName() {
    let value = document.getElementById("firstname").value;
    if (value.length > 2 && value.length < 30 && /^[a-zA-Z]+$/.test(value)) {
        return true;
    } else {
        document.getElementById("firstname").classList.add("required");
        return false;
    }
}

function checkEmail() {
    let value = document.getElementById("email").value;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
        return true;
    } else {
        document.getElementById("email").classList.add("required");
        return false;
    }
}

function checkAddress() {
    let value = document.getElementById("address").value;
    if (value.length > 20 && value.length < 100) {
        return true;
    } else {
        document.getElementById("address").classList.add("required");
        return false;
    }
}

function checkCity() {
    let value = document.getElementById("city").value;
    if (value.length > 3 && value.length < 30 && /^[a-zA-Z]+$/.test(value)) {
        return true;
    } else {
        document.getElementById("city").classList.add("required");
        return false;
    }
}

function checkCP() {
    let value = document.getElementById("cp").value;
    if (isNaN(value)) {
        document.getElementById("cp").classList.add("required");
        return false;
    } else {
        return true;
    }
}

formBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (checkName() && checkFirstName() && checkEmail() && checkAddress() && checkCP() && checkCity) {
        let lastName = document.getElementById("name").value;
        let firstName = document.getElementById("firstname").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        let cp = document.getElementById("cp").value;
        let city = document.getElementById("city").value;
        let contact = { lastName, firstName, email, address, cp, city };
        let arrayOfPaidProducts = [];
        JSON.parse(localStorage.getItem("Teddies")).forEach((teddy) => {
            for (let i = 0; i < teddy.quantity; i++) {
                arrayOfPaidProducts.push(teddy.id);
            }
        });
        let body = JSON.stringify({ contact, products: arrayOfPaidProducts });

        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: body,
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((order) => {
                localStorage.setItem("orderId", JSON.stringify(order.orderId));
                localStorage.setItem("user", JSON.stringify(order.contact));
            })
            .then(() => {
                localStorage.removeItem("Teddies");
                location.href = "resume.html";
            })
            .catch((err) => console.log(err));
    } else {
        alert("Vérifiez vos informations !");
    }
});
