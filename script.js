const cartItems = [];
const cartTotalElement = document.getElementById('cart-total');
const cartItemsContainer = document.getElementById('cart-items');

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const itemName = button.getAttribute('data-name');
    const itemPrice = parseFloat(button.getAttribute('data-price'));
    addItemToCart(itemName, itemPrice);
  });
});

function addItemToCart(name, price) {
  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name, price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cartItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>&#8377 ${item.price}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
      </td>
      <td>&#8377 ${item.price * item.quantity}</td>
      <td><button onclick="removeItem('${item.name}')">Remove</button></td>
    `;
    cartItemsContainer.appendChild(row);
    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = &#8377 ${total.toFixed(2)};
}

function updateQuantity(name, quantity) {
  const item = cartItems.find(item => item.name === name);
  if (item) {
    item.quantity = parseInt(quantity);
    updateCart();
  }
}

function removeItem(name) {
  const index = cartItems.findIndex(item => item.name === name);
  if (index > -1) {
    cartItems.splice(index, 1);
    updateCart();
  }
}