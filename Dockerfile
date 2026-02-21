# Dockerfile
FROM mcr.microsoft.com/playwright:v1.36.0-focal

# Crée le répertoire de l'app
WORKDIR /app

# Copie package.json + package-lock.json
COPY package*.json ./

# Installe les dépendances Node et Playwright
RUN npm install
RUN npx playwright install --with-deps

# Copie le reste du code
COPY . .

# Variables d'environnement (si tu veux les définir ici)
# ENV LINKEDIN_USER=xxx
# ENV LINKEDIN_PASS=yyy

EXPOSE 8080
CMD ["node", "index.js"]
