from flask import Flask
from controllers.report_controller import report_blueprint

def create_app():
    app = Flask(__name__)
    app.register_blueprint(report_blueprint)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
