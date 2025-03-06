from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_cors import CORS

app = Flask(__name__)  # add l'application Flask ici
CORS(app)  # Active CORS pour toutes les routes
app.config.from_object(Config)
db = SQLAlchemy(app)

# Ajouter la route d'accueil ici
@app.route('/')
def home():
    return "Bienvenue sur l'API Météo"

# Modèle pour la table "weather_data"
class WeatherData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String(100))
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Float)
    summary = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

# Créer la base de données si elle n'existe pas encore
with app.app_context():
    db.create_all()

# Routes CRUD
@app.route('/weather', methods=['POST'])
def create_weather():
    data = request.get_json()
    new_weather = WeatherData(
        city_name=data['city_name'],
        temperature=data['temperature'],
        humidity=data['humidity'],
        summary=data['summary']
    )
    db.session.add(new_weather)
    db.session.commit()
    return jsonify({"message": "Weather data added successfully"}), 201

@app.route('/weather', methods=['GET'])
def get_weather():
    weather_data = WeatherData.query.all()
    result = []
    for weather in weather_data:
        result.append({
            'id': weather.id,
            'city_name': weather.city_name,
            'temperature': weather.temperature,
            'humidity': weather.humidity,
            'summary': weather.summary,
            'created_at': weather.created_at
        })
    return jsonify(result)

@app.route('/weather/<int:id>', methods=['GET'])
def get_weather_by_id(id):
    weather = WeatherData.query.get_or_404(id)
    return jsonify({
        'id': weather.id,
        'city_name': weather.city_name,
        'temperature': weather.temperature,
        'humidity': weather.humidity,
        'summary': weather.summary,
        'created_at': weather.created_at
    })

@app.route('/weather/<int:id>', methods=['PUT'])
def update_weather(id):
    weather = WeatherData.query.get_or_404(id)
    data = request.get_json()
    weather.city_name = data['city_name']
    weather.temperature = data['temperature']
    weather.humidity = data['humidity']
    weather.summary = data['summary']
    db.session.commit()
    return jsonify({"message": "Weather data updated successfully"})

@app.route('/weather/<int:id>', methods=['DELETE'])
def delete_weather(id):
    weather = WeatherData.query.get_or_404(id)
    db.session.delete(weather)
    db.session.commit()
    return jsonify({"message": "Weather data deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)

