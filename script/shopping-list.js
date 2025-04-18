let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

// DOM Elements
const shoppingListElement = document.getElementById("shopping-list");
const totalCostElement = document.getElementById("total-cost");
const addItemForm = document.getElementById("add-item-form");

// Add item to the shopping list
addItemForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const itemName = document.getElementById("item-name").value;
    const itemPrice = parseFloat(document.getElementById("item-price").value);

    if (itemName && !isNaN(itemPrice)) {
        const item = { name: itemName, price: itemPrice };
        shoppingList.push(item);
        saveListToLocalStorage();
        renderShoppingList();
        addItemForm.reset();
    }
});

// Remove item from the shopping list
function removeItem(index) {
    shoppingList.splice(index, 1);
    saveListToLocalStorage();
    renderShoppingList();
}

// Save shopping list to local storage
function saveListToLocalStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

// Calculate total estimated cost
function calculateTotalCost() {
    return shoppingList.reduce((total, item) => total + item.price, 0).toFixed(2);
}

// Render shopping list
function renderShoppingList() {
    shoppingListElement.innerHTML = "";
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removeItem(${index})">Remove</button>
        `;
        shoppingListElement.appendChild(listItem);
    });

    totalCostElement.textContent = `Total Estimated Cost: $${calculateTotalCost()}`;
}

// Initial render
renderShoppingList();
