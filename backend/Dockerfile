# Utiliser l'image officielle de Python 3.10
FROM python:3.10

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'application dans le conteneur
COPY . .

# Vérifier le contenu du répertoire /app
RUN ls -l /app

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port Flask
EXPOSE 5000

# Démarrer l'application Flask avec Python directement
CMD ["python", "app.py", "--host", "0.0.0.0"]
