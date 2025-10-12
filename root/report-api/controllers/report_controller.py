from flask import Blueprint, send_file, jsonify
from flask_pydantic import validate
from models.report_model import ReportData
from services.report_service import generate_docx_report

report_blueprint = Blueprint("report", __name__)

@report_blueprint.route("/generate-report", methods=["POST"])
@validate()
def generate_report(body: ReportData):
    try:
        file_stream, file_name = generate_docx_report(body)
        return send_file(
            file_stream,
            as_attachment=True,
            download_name=file_name,
            mimetype="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
