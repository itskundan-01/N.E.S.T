document.getElementById('gpsBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            alert(`Your coordinates are: Latitude ${position.coords.latitude}, Longitude ${position.coords.longitude}`);
        }, error => {
            alert('Unable to retrieve your location. Please try again.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

document.getElementById('manualBtn').addEventListener('click', () => {
    document.getElementById('coordinateInput').style.display = 'block';
});

document.getElementById('calculateBtn').addEventListener('click', () => {
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const district = document.getElementById('district').value;

    if (country && state && district) {
        alert(`Position calculation for: ${country}, ${state}, ${district}.`);
    } else {
        alert('Please fill out all fields.');
    }
});
