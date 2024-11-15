import "../css/index.scss";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position: GeolocationPosition) {
    alert(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
}
