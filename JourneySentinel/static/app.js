document.addEventListener('DOMContentLoaded', () => {
    fetch('/get-theft-detection-data')
        .then(response => response.json())
        .then(data => {
            const detectionList = document.getElementById('detection-list');

            // Clear existing content
            detectionList.innerHTML = '';

            // Display fetched data
            data.forEach(item => {
                const detectionItem = document.createElement('div');
                detectionItem.classList.add('detection-item');

                // Timestamp
                const timestamp = document.createElement('p');
                timestamp.classList.add('timestamp');
                timestamp.textContent = `시간: ${item.timestamp}`;

                // Location
                const location = document.createElement('p');
                location.classList.add('location');
                location.textContent = `장소: ${item.location}`;

                // Append timestamp and location
                detectionItem.appendChild(timestamp);
                detectionItem.appendChild(location);
                detectionList.appendChild(detectionItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
