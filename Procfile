web: npm install
web: npm run deploy
web: pip install -r requirements.txt
web: gunicorn -w 4 -b 0.0.0.0:$PORT runserver:app
