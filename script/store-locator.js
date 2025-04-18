let map;
let service;
let infowindow;

function initMap() {
  // Default location (e.g., New York City)
  const defaultLocation = { lat: 40.7128, lng: -74.006 };

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
      // Process results
      clearMarkers();
      map.setCenter(results[0].geometry.location);
      results.forEach((place) => {
        addMarker(place);
      });
    } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      alert("No stores found. Please try a different location.");
    } else if (
      status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT
    ) {
      alert("You have exceeded your API usage limits. Please try again later.");
    } else if (
      status === google.maps.places.PlacesServiceStatus.REQUEST_DENIED
    ) {
      alert(
        "Your API key is invalid or restricted. Please check your API key."
      );
    } else {
      alert(
        "An error occurred while fetching store locations. Please try again."
      );
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

  // Add ARIA attributes for accessibility
  marker.getElement().setAttribute("role", "button");
  marker.getElement().setAttribute("aria-label", `Store: ${place.name}`);
}

function clearMarkers() {
  // Clear all markers from the map (if needed)
  // Implement marker clearing logic here if you store markers in an array
}

// Initialize the map when the page loads
window.initMap = initMap;

async function testAPIKey() {
  const apiKey = "AIzaSyDs6hc-05FPAz-aDULK5sMqM2dOpKgkWvQ";
  const testUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=New+York&inputtype=textquery&fields=name,geometry&key=${apiKey}`;

  try {
    const response = await fetch(testUrl);
    const data = await response.json();
    console.log("Test API Response:", data);
  } catch (error) {
    console.error("Error testing API key:", error);
  }
}

testAPIKey();
