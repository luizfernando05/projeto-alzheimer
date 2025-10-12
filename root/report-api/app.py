from flask import Flask
from flask_cors import CORS
from controllers.report_controller import report_blueprint

def create_app():
    app = Flask(__name__)
    
    # Configurar CORS para permitir requisições do frontend
    CORS(app, origins=['http://localhost:5173'])
    
    app.register_blueprint(report_blueprint)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5001)  # Mudando para porta 5001
