from docx import Document
import io
from datetime import datetime

def generate_docx_report(data):
    template = Document("modelo_relatorio_do_paciente.docx")
    patient = data.patient
    medical = data.medicalData

    mapping = {
        # dados pessoais
        "NOME": patient.name,
        "EMAIL": patient.email,
        "NASCIMENTO": patient.birthDate,
        "GENERO": patient.gender,
        "ESTADO": patient.state,
        "ERNIA": patient.ethnicity,
        "ESCOLARIDADE": patient.educationLevel,
        "TELEFONE": patient.phoneNumber,

        # dados médicos
        "DATA_EXAM": medical.dateExam,
        "IMC_N": str(medical.bmi),
        "PESO": str(medical.weight),
        "ALTURA": str(medical.height),
        "QUALI_SONO": medical.sleepQuality,
        "QUALI_DIETA": str(medical.dietQuality),
        "LDL_N": str(medical.cholesterolLdl),
        "HDL_N": str(medical.cholesterolHdl),
        "TRIGLIC": str(medical.cholesterolTriglycerides),
        "C_TOTAL": str(medical.cholesterolTotal),
        "PRESSAO_S": str(medical.systolicBP),
        "PRESSAO_D": str(medical.diastolicBP),
        "EX_FISICO": "Sim" if medical.physicalActivity else "Não" if medical.physicalActivity is not None else "",
        "TABAGISMO": "Sim" if medical.smoking else "Não" if medical.smoking is not None else "",
        "ALC": "Sim" if medical.alcoholConsumption else "Não" if medical.alcoholConsumption is not None else "",

        # histórico médico
        "HIST_ALZ": "Sim" if medical.familyHistory else "Não" if medical.familyHistory is not None else "",
        "HIST_CAR": "Sim" if medical.cardiovascularDisease else "Não" if medical.cardiovascularDisease is not None else "",
        "HIST_DIA": "Sim" if medical.diabetes else "Não" if medical.diabetes is not None else "",
        "HIST_DEP": "Sim" if medical.depression else "Não" if medical.depression is not None else "",
        "HIST_TRA": "Sim" if medical.headTrauma else "Não" if medical.headTrauma is not None else "",
        "HIST_HIP": "Sim" if medical.hypertension else "Não" if medical.hypertension is not None else "",

        # funções cognitivas
        "MMSE_N": str(medical.mmse),
        "ADL_N": str(medical.adl),
        "ATV_FUNC": str(medical.functionalAssessment),
        "QUEI_MEM": "Sim" if medical.memoryComplaints else "Não" if medical.memoryComplaints is not None else "",
        "PROB_C": "Sim" if medical.behavioralProblems else "Não" if medical.behavioralProblems is not None else "",

        # sintomas cognitivos
        "SINT_CON": "Sim" if medical.confusion else "Não" if medical.confusion is not None else "",
        "SINT_DES": "Sim" if medical.disorientation else "Não" if medical.disorientation is not None else "",
        "SINT_ESQ": "Sim" if medical.forgetfulness else "Não" if medical.forgetfulness is not None else "",
        "SINT_MUD": "Sim" if medical.personalityChanges else "Não" if medical.personalityChanges is not None else "",
        "SINT_DIF": "Sim" if medical.difficultyCompletingTasks else "Não" if medical.difficultyCompletingTasks is not None else "",

    }

    # substituir no docx
    for paragraph in template.paragraphs:
        for label in mapping:
            value = mapping[label]
            if value is not None:
                paragraph.text = paragraph.text.replace(label, value)
            
    # salvar em memória
    file_stream = io.BytesIO()
    template.save(file_stream)
    file_stream.seek(0)

    filename = f"relatório_{patient.name}_{datetime.now().strftime('%Y%m%d')}.docx"
    return file_stream, filename
