from flask import Blueprint, request, jsonify, send_file
from services.report_service import ReportService
import logging

report_blueprint = Blueprint('report', __name__)

@report_blueprint.route('/generate-report', methods=['POST'])
def generate_report():
    try:
        # Log dos dados recebidos para debug
        data = request.get_json()
        logging.info(f"Dados recebidos: {data}")
        
        # Validar se os dados necessários estão presentes
        if not data or 'patient' not in data or 'medicalData' not in data:
            return jsonify({'error': 'Dados do paciente e dados médicos são obrigatórios'}), 400
        
        patient = data['patient']
        medical_data = data['medicalData']
        
        # Validar campos obrigatórios do paciente
        required_patient_fields = ['name', 'email', 'birthDate', 'gender']
        for field in required_patient_fields:
            if field not in patient or not patient[field]:
                return jsonify({'error': f'Campo obrigatório ausente: {field}'}), 400
        
        # Gerar o relatório
        report_service = ReportService()
        file_path = report_service.generate_report(patient, medical_data)
        
        return send_file(
            file_path,
            as_attachment=True,
            download_name=f"{patient['name'].replace(' ', '_')}_relatorio.docx",
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
        
    except Exception as e:
        logging.error(f"Erro ao gerar relatório: {str(e)}")
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500
