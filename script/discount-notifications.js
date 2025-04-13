const API_KEY = "a0f6a8a0cde2475cb9fe50986ab7717c"; // Replace with your actual API key
const API_URL = "https://api.spoonacular.com/food/products/search"; // Base API endpoint

// Fetch discount data from API
async function fetchDiscounts() {
  try {
    const response = await fetch(
      `${API_URL}?query=discount&number=10&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (data.products && data.products.length > 0) {
      displayDiscountNotifications(data.products);
    } else {
      console.log("No discounts available.");
    }
  } catch (error) {
    console.error("Error fetching discount data:", error);
  }
}

// Display discount notifications
function displayDiscountNotifications(products) {
  const notificationsContainer = document.getElementById(
    "discount-notifications"
  );
  notificationsContainer.innerHTML = "";

  products.forEach((product) => {
    if (product.discount || product.priceDrop) {
      const notification = document.createElement("div");
      notification.classList.add("notification");
      notification.innerHTML = `
                <h3>${product.title}</h3>
                <p>Discount: ${
                  product.discount ? `${product.discount}%` : "N/A"
                }</p>
                <p>Price Drop: ${
                  product.priceDrop ? `$${product.priceDrop}` : "N/A"
                }</p>
            `;
      notificationsContainer.appendChild(notification);
    }
  });
}

// Trigger notifications on page load
document.addEventListener("DOMContentLoaded", fetchDiscounts);
