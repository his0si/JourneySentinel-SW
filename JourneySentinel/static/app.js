document.addEventListener('DOMContentLoaded', () => {
    fetch('/get-theft-detection-data')
        .then(response => response.json())
        .then(data => {
            const detectionList = document.getElementById('detection-list');

            // 가져온 데이터를 화면에 표시
            data.forEach(item => {
                const detectionItem = document.createElement('div');
                detectionItem.classList.add('detection-item');

                const message = document.createElement('p');
                message.classList.add('message');
                message.textContent = `메시지: ${item.message}`;

                const timestamp = document.createElement('p');
                timestamp.classList.add('timestamp');
                timestamp.textContent = `시간: ${item.timestamp}`;

                detectionItem.appendChild(message);
                detectionItem.appendChild(timestamp);
                detectionList.appendChild(detectionItem);
            });
        })
        .catch(error => console.error('데이터 가져오기 오류:', error));
});
