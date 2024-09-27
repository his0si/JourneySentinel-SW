document.addEventListener('DOMContentLoaded', () => {
    fetch('/get-theft-detection-data')
        .then(response => response.json())
        .then(data => {
            const detectionList = document.getElementById('detection-list');

            data.forEach(item => {
                const detectionItem = document.createElement('div');
                detectionItem.classList.add('detection-item');

                const date = document.createElement('p');
                date.classList.add('date');
                date.textContent = item.date;

                const location = document.createElement('p');
                location.classList.add('location');
                location.textContent = item.location;

                detectionItem.appendChild(date);
                detectionItem.appendChild(location);
                detectionList.appendChild(detectionItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
