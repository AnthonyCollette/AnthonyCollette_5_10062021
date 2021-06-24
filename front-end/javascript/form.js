var formBtn = document.getElementById("btn-command");
var input = document.getElementsByTagName("input");

function checkForm(element) {
    if (element.value.length > 2 && element.value.length < 30 && /^[a-zA-Z]+$/.test(element.value)) {
        return true;
    } else {
        element.classList.add("required");
        return false;
    }
}

function checkEmail(element) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(element.value)) {
        return true;
    } else {
        element.classList.add("required");
        return false;
    }
}

function checkAddress(element) {
    if (element.value.length > 20 && element.value.length < 100) {
        return true;
    } else {
        element.classList.add("required");
        return false;
    }
}

formBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let lastName = document.getElementById("name");
    let firstName = document.getElementById("firstname");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    let city = document.getElementById("city");

    if (checkForm(lastName) && checkForm(firstName) && checkEmail(email) && checkAddress(address) && checkForm(city)) {
        let contact = { lastName: lastName.value, firstName: firstName.value, email: email.value, address: address.value, cp: cp.value, city: city.value };
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
