document.getElementById('gpsBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            document.getElementById('latitude').value = latitude;
            document.getElementById('longitude').value = longitude;

            alert(`Coordinates set: Latitude ${latitude}, Longitude ${longitude}`);
        }, error => {
            alert('Unable to retrieve your location. Please try again.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

document.getElementById('userDetailsForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value
    };

    const response = await fetch('/save-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Data saved successfully!');
    } else {
        alert('Failed to save data. Please try again.');
    }
});
