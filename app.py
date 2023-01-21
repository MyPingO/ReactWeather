from flask import Flask
from server import create_app, APIKey

app = create_app()

@app.route('/')
def home():
    return 'WeatherApp3000'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=25566)