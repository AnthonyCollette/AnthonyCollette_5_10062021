var user = JSON.parse(localStorage.getItem("user"));
var totalPrice = localStorage.getItem("Montant Total");
document.getElementById("congratsName").innerHTML = user.firstName;
document.getElementById("orderid").innerHTML = JSON.parse(localStorage.getItem("orderId"));
document.getElementById("totalamount").innerHTML = totalPrice + `€`;
