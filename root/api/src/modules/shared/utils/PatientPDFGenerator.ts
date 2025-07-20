import PDFDocument from 'pdfkit';
import { Response } from 'express';
import Patient from '../../../domain/entities/Patient';
import MedicalData from '../../../domain/entities/MedicalData';

export const generatePatientPdf = (
  patient: Patient,
  medicalData: MedicalData,
  res: Response
) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=${patient.name.replace(/\s+/g, '_')}_relatorio.pdf`
  );

  doc.pipe(res);

  const pageWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const labelWidth = 180;
  const valueX = doc.page.margins.left + labelWidth + 10;
  const lineHeight = 20;

  // Helper para desenhar label e valor alinhados em uma linha
  const drawLabelValue = (label: string, value: any, y: number) => {
    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#333')
      .text(label, doc.page.margins.left, y, { width: labelWidth });
    doc
      .font('Helvetica')
      .fontSize(12)
      .fillColor('#000')
      .text(
        value !== null && value !== undefined ? String(value) : 'N/A',
        valueX,
        y
      );
  };

  // Linha separadora horizontal
  const drawSeparator = (y: number) => {
    doc
      .strokeColor('#AAAAAA')
      .lineWidth(1)
      .moveTo(doc.page.margins.left, y)
      .lineTo(doc.page.width - doc.page.margins.right, y)
      .stroke();
  };

  // Cabeçalho
  doc
    .fontSize(24)
    .fillColor('#0B3D91')
    .font('Helvetica-Bold')
    .text('Relatório do Paciente', { align: 'center' });
  doc.moveDown(1.5);

  // Dados pessoais
  doc
    .fontSize(18)
    .fillColor('#0B3D91')
    .font('Helvetica-Bold')
    .text('Dados Pessoais');
  doc.moveDown(0.5);

  let y = doc.y;
  drawLabelValue('Nome:', patient.name, y);
  y += lineHeight;
  drawLabelValue('Email:', patient.email, y);
  y += lineHeight;
  drawLabelValue('Nascimento:', patient.birthDate, y);
  y += lineHeight;
  drawLabelValue('Gênero:', patient.gender, y);
  y += lineHeight;
  drawLabelValue('Estado:', patient.state, y);
  y += lineHeight;
  drawLabelValue('Etnia:', patient.ethnicity, y);
  y += lineHeight;
  drawLabelValue('Escolaridade:', patient.educationLevel, y);
  y += lineHeight;
  drawLabelValue('Telefone:', patient.phoneNumber, y);

  y += lineHeight * 1.5;
  drawSeparator(y);
  y += lineHeight;

  // Dados médicos
  doc
    .fontSize(18)
    .fillColor('#0B3D91')
    .font('Helvetica-Bold')
    .text('Dados Médicos');
  doc.moveDown(0.5);
  y = doc.y;

  // Para dados médicos, vamos usar duas colunas para economizar espaço
  const halfPageWidth = (pageWidth - 20) / 2;

  const drawMedicalData = (label: string, value: any, index: number) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = doc.page.margins.left + col * (halfPageWidth + 20);
    const posY = y + row * lineHeight;
    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .fillColor('#333')
      .text(label, x, posY, { width: 120 });
    doc
      .font('Helvetica')
      .fontSize(12)
      .fillColor('#000')
      .text(
        value !== null && value !== undefined ? String(value) : 'N/A',
        x + 130,
        posY
      );
  };

  const medicalItems = [
    ['Data do exame', medicalData.dateExam],
    ['IMC', medicalData.bmi],
    ['Peso (kg)', medicalData.weight],
    ['Altura (cm)', medicalData.height],
    ['Qualidade do sono', medicalData.sleepQuality ? 'Boa' : 'Ruim'],
    ['Qualidade da dieta (0–10)', medicalData.dietQuality],
    ['LDL', medicalData.cholesterolLdl],
    ['HDL', medicalData.cholesterolHdl],
    ['Triglicerídeos', medicalData.cholesterolTriglycerides],
    [
      'Colesterol total',
      medicalData.cholesterolTotal || medicalData.cholesterolTotal,
    ],
    ['Pressão sistólica', medicalData.systolicBP],
    ['Pressão diastólica', medicalData.diastolicBP],
    ['Exercício físico?', medicalData.physicalActivity ? 'Sim' : 'Não'],
    ['Tabagismo?', medicalData.smoking ? 'Sim' : 'Não'],
    ['Consumo de álcool?', medicalData.alcoholConsumption ? 'Sim' : 'Não'],
  ];

  medicalItems.forEach(([label, value], i) =>
    drawMedicalData(label as string, value, i)
  );
  y += Math.ceil(medicalItems.length / 2) * lineHeight + lineHeight;

  drawSeparator(y);
  y += lineHeight;

  // Histórico Médico
  doc
    .fontSize(18)
    .fillColor('#0B3D91')
    .font('Helvetica-Bold')
    .text('Histórico Médico');
  doc.moveDown(0.5);
  y = doc.y;

  const medicalHistory = [
    ['Alzheimer na família?', medicalData.familyHistory ? 'Sim' : 'Não'],
    [
      'Doença cardiovascular?',
      medicalData.cardiovascularDisease ? 'Sim' : 'Não',
    ],
    ['Diabetes?', medicalData.diabetes ? 'Sim' : 'Não'],
    ['Depressão?', medicalData.depression ? 'Sim' : 'Não'],
    ['Traumatismo craniano?', medicalData.headTrauma ? 'Sim' : 'Não'],
    ['Hipertensão?', medicalData.hypertension ? 'Sim' : 'Não'],
  ];

  medicalHistory.forEach(([label, value], i) => {
    drawLabelValue(label, value, y + i * lineHeight);
  });

  y += medicalHistory.length * lineHeight + lineHeight;
  drawSeparator(y);
  y += lineHeight;

  // Funções Cognitivas
  doc
    .fontSize(18)
    .fillColor('#0B3D91')
    .font('Helvetica-Bold')
    .text('Funções Cognitivas');
  doc.moveDown(0.5);
  y = doc.y;

  const cognitiveFunctions = [
    ['MMSE (0–30)', medicalData.mmse],
    ['Atividades funcionais (0–10)', medicalData.functionalAssessment],
    ['Queixas de memória?', medicalData.memoryComplaints ? 'Sim' : 'Não'],
    [
      'Problemas comportamentais?',
      medicalData.behavioralProblems ? 'Sim' : 'Não',
    ],
    ['ADL (0–10)', medicalData.adl],
  ];

  cognitiveFunctions.forEach(([label, value], i) => {
    drawLabelValue(label as string, value, y + i * lineHeight);
  });

  y += cognitiveFunctions.length * lineHeight + lineHeight;
  drawSeparator(y);
  y += lineHeight;

  // Sintomas Cognitivos
  doc
    .fontSize(18)
    .fillColor('#0B3D91')
    .font('Helvetica-Bold')
    .text('Sintomas Cognitivos');
  doc.moveDown(0.5);
  y = doc.y;

  const cognitiveSymptoms = [
    ['Confusão?', medicalData.confusion ? 'Sim' : 'Não'],
    ['Desorientação?', medicalData.disorientation ? 'Sim' : 'Não'],
    [
      'Mudanças de personalidade?',
      medicalData.personalityChanges ? 'Sim' : 'Não',
    ],
    [
      'Dificuldade para completar tarefas?',
      medicalData.difficultyCompletingTasks ? 'Sim' : 'Não',
    ],
    ['Esquecimento?', medicalData.forgetfulness ? 'Sim' : 'Não'],
  ];

  cognitiveSymptoms.forEach(([label, value], i) => {
    drawLabelValue(label as string, value, y + i * lineHeight);
  });

  doc.end();
};
