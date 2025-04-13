let map;
let service;
let infowindow;

function initMap() {
    // Default location (e.g., New York City)
    const defaultLocation = { lat: 40.7128, lng: -74.0060 };

    // Initialize the map
    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12,
    });

    // Initialize the info window
    infowindow = new google.maps.InfoWindow();

    // Add event listener for the search button
    document.getElementById("search-button").addEventListener("click", () => {
        const query = document.getElementById("store-search").value;
        if (query) {
            searchStores(query);
        }
    });
}

function searchStores(query) {
    const request = {
        query: query,
        fields: ["name", "geometry", "place_id"],
    };

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            // Clear existing markers
            clearMarkers();

            // Center the map on the first result
            map.setCenter(results[0].geometry.location);

            // Add markers for each result
            results.forEach((place) => {
                addMarker(place);
            });
        } else {
            alert("No stores found. Please try a different location.");
        }
    });
}

function addMarker(place) {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });

    // Add click listener to show item availability
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(`
            <h3>${place.name}</h3>
            <p>Item availability: <strong>In Stock</strong></p>
        `);
        infowindow.open(map, marker);
    });
}

function clearMarkers() {
    // Clear all markers from the map (if needed)
    // Implement marker clearing logic here if you store markers in an array
}

// Initialize the map when the page loads
window.initMap = initMap;