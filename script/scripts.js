const API_KEY = "a0f6a8a0cde2475cb9fe50986ab7717c"; // Replace with your actual API key
const API_URL = "https://api.spoonacular.com/food/products/search"; // Base API endpoint

// Test API connection
async function testAPIConnection() {
  try {
    const response = await fetch(
      `${API_URL}?query=apple&number=5&apiKey=${API_KEY}`
    );
    const data = await response.json();
    console.log("API Connection Successful:", data);
  } catch (error) {
    console.error("Error connecting to the API:", error);
  }
}

// Call the test function
testAPIConnection();

// Handle search form submission
document
  .getElementById("search-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = document.getElementById("search-input").value;
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch(
        `${API_URL}?query=${query}&number=5&apiKey=${API_KEY}`
      );
      const data = await response.json();

      // Display search results
      resultsContainer.innerHTML = "";
      if (data.products && data.products.length > 0) {
        data.products.forEach((product) => {
          const productElement = document.createElement("div");
          productElement.classList.add("product-item");
          productElement.innerHTML = `
          <h3>${product.title}</h3>
          <p>Price: ${product.price ? `$${product.price}` : "N/A"}</p>
          <img src="${product.image || "placeholder.jpg"}" alt="${
            product.title
          }" width="100">
        `;
          resultsContainer.appendChild(productElement);
        });
      } else {
        resultsContainer.innerHTML = "<p>No products found.</p>";
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      resultsContainer.innerHTML =
        "<p>Error fetching search results. Please try again later.</p>";
    }
  });
