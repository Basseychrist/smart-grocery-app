const API_KEY = 'your_api_key_here'; // Replace with your actual API key
const API_URL = 'https://api.example.com/products/search'; // Replace with the actual API endpoint

// Handle search form submission
document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('search-input').value;
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`${API_URL}?query=${query}&apiKey=${API_KEY}`);
        const data = await response.json();

        // Display search results
        resultsContainer.innerHTML = '';
        if (data.products && data.products.length > 0) {
            data.products.forEach((product) => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-item');
                productElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price ? `$${product.price}` : 'N/A'}</p>
                    <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}" width="100">
                `;
                resultsContainer.appendChild(productElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No products found.</p>';
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        resultsContainer.innerHTML = '<p>Error fetching search results. Please try again later.</p>';
    }
});