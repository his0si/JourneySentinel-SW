document.addEventListener('DOMContentLoaded', () => {
    const warningBox = document.getElementById('warning'); // 경고 박스 요소 추가

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

            // 경고 박스 표시
            if (data.length === 0) {
                warningBox.style.display = 'block'; // 데이터가 없을 때 경고 박스 표시
            } else {
                warningBox.style.display = 'none'; // 데이터가 있을 때 경고 박스 숨김
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            warningBox.style.display = 'block'; // 오류 발생 시 경고 박스 표시
        });
});
