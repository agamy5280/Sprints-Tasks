const discountPer = 0.25;
const shippingCost = 30;
const getShipping = () => {
    return products.length * 10;
  };
  
  const getSubTotal = () => {
    return products.map((p) => p.price * p.quantity).reduce((a, e) => (a += e));
  };
  
  const getTotal = () => getShipping() + getSubTotal();
  
  const decQuantity = (i) => {
    if (products[i].quantity > 1) products[i].quantity--;
    renderHTML();
  };
  const incQuantity = (i) => {
    products[i].quantity++;
    renderHTML();
  };
  const remove = (i) => {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderHTML();
  };
  
  const renderHTML = () => {
    document.getElementById("product-cart").innerHTML = "";
    products.forEach((p, i) => {
      document.getElementById("product-cart").innerHTML += getProductHTMLRow(p, i);
    });
    document.getElementById("shipping-cost").innerHTML = `$${getShipping()}`;
    document.getElementById("subtotal-cost").innerHTML = `$${getSubTotal()}`;
    document.getElementById("total-cost").innerHTML = `$${getTotal()}`;
  };
  
  const getProductHTMLRow = (p, i) => {
    return `
    <ul class="myClass">
        <li><img src="./images/${p.productName}.jpg" alt="" style="width: 50px;">${p.productName}</li>
        <li>$${p.price}</li>
        <li>
        <button id="minus-btn" onclick="decQuantity(${i})"><i class="fa-solid fa-minus"></i></button>
        ${p.quantity}
        <button id="plus-btn" onclick="incQuantity(${i})"><i class="fa-solid fa-plus"></i></button>
        </li>
        <li>$${p.price * p.quantity}</li>
        <li><button id="remove-btn" onclick="remove(${i})"><i class="fa-solid fa-x"></i></button></li>
    </ul>
    `
  };
  
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  renderHTML();

  function addCoupon() {
    let couponCode = document.getElementById("coupon").value;
    if (couponCode == "Sprints" || couponCode == "sprints") {
        subtotal = document.getElementById("subtotal-cost").innerHTML;
        subtotal = subtotal.slice(1);
        console.log(subtotal);
        let price = subtotal * discountPer;
        let discount = subtotal - price;
        document.getElementById("discount").innerHTML = "$" + "-" +  discount;
        document.getElementById("total-cost").innerHTML =  "$" + (price + shippingCost);
        document.getElementById("coupon-btn").disabled = true;
        document.getElementById("coupon-btn").style.backgroundColor = "grey"
        document.getElementById("coupon-btn").style.cursor = "none";
        renderHTML();
    } else {
        alert("Coupon is invalid!")
    }
}