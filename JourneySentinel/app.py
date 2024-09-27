from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO
import logging

app = Flask(__name__)
socketio = SocketIO(app)

logging.basicConfig(level=logging.INFO)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def test_connect():
    app.logger.info('Client connected')

@socketio.on('disconnect')
def test_disconnect():
    app.logger.info('Client disconnected')

@app.route('/warning', methods=['POST'])
def warning():
    message = request.form.get('message')
    timestamp = request.form.get('timestamp')

    if message and timestamp:
        app.logger.info(f"Received message: {message} at {timestamp}")
        app.logger.info("Emitting new_warning event")
        socketio.emit('new_warning', {'message': message, 'timestamp': timestamp})
        return jsonify({'status': 'success', 'message': 'Data received'}), 200
    else:
        app.logger.error("Missing data in warning request")
        return jsonify({'status': 'error', 'message': 'Missing data'}), 400

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)