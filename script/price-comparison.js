const API_KEY = "a0f6a8a0cde2475cb9fe50986ab7717c"; // Replace with your actual API key
const API_URL = "https://api.spoonacular.com/food/products/search"; // Base API endpoint

// Handle price comparison form submission
document
  .getElementById("price-comparison-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const productName = document.getElementById("product-input").value;
    const resultsContainer = document.getElementById("price-results");
    resultsContainer.innerHTML = "<p>Loading...</p>";

    try {
      // Fetch price data from API
      const response = await fetch(
        `${API_URL}?query=${productName}&number=10&apiKey=${API_KEY}`
      );
      const data = await response.json();

      // Check if products are found
      if (data.products && data.products.length > 0) {
        // Sort prices by best deals
        const sortedProducts = data.products.sort(
          (a, b) => (a.price || Infinity) - (b.price || Infinity)
        );

        // Display results
        resultsContainer.innerHTML = "";
        sortedProducts.forEach((product) => {
          const productElement = document.createElement("div");
          productElement.classList.add("price-item");
          productElement.innerHTML = `
                    <h3>${product.title}</h3>
                    <p>Price: ${product.price ? `$${product.price}` : "N/A"}</p>
                    <p>Store: ${product.store || "Unknown"}</p>
                    <p>Rating: ${product.rating || "No rating available"}</p>
                `;
          resultsContainer.appendChild(productElement);
        });
      } else {
        resultsContainer.innerHTML =
          "<p>No products found. Please try a different search.</p>";
      }
    } catch (error) {
      console.error("Error fetching price data:", error);
      resultsContainer.innerHTML =
        "<p>Error fetching price data. Please try again later.</p>";
    }
  });
