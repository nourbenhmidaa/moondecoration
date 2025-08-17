let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "Total: 0 DT";
    return;
  }

  let total = 0;

  cart.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "cart-item";

    const img = document.createElement("img");
    img.src = product.images.default;
    img.alt = product.name;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = product.price;

    let priceValue = parseFloat(product.price.replace("DT", ""));
    total += priceValue * product.quantity;

    // Quantity controls
    const qtyContainer = document.createElement("div");
    qtyContainer.className = "qty-container";

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "−";
    decreaseBtn.className = "qty-btn";
    decreaseBtn.addEventListener("click", () => changeQuantity(index, -1));

    const qtyText = document.createElement("span");
    qtyText.textContent = product.quantity;
    qtyText.className = "qty-text";

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.className = "qty-btn";
    increaseBtn.addEventListener("click", () => changeQuantity(index, 1));

    qtyContainer.appendChild(decreaseBtn);
    qtyContainer.appendChild(qtyText);
    qtyContainer.appendChild(increaseBtn);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      removeFromCart(index);
    });

    item.appendChild(img);
    item.appendChild(name);
    item.appendChild(price);
    item.appendChild(qtyContainer);
    item.appendChild(removeBtn);
    container.appendChild(item);
  });

  document.getElementById("cart-total").textContent = `Total: ${total} DT`;
}

function changeQuantity(index, change) {
  cart[index].quantity += change;
  
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Remove item if quantity is 0
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}



renderCart();
