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

  // Cabeçalho
  doc.fontSize(20).text(`Relatório do Paciente`, { align: 'center' });
  doc.moveDown();

  // Dados pessoais
  doc.fontSize(14).text(`Nome: ${patient.name}`);
  doc.text(`Email: ${patient.email}`);
  doc.text(`Nascimento: ${patient.birthDate}`);
  doc.text(`Gênero: ${patient.gender}`);
  doc.text(`Estado: ${patient.state}`);
  doc.text(`Etnia: ${patient.ethnicity}`);
  doc.text(`Escolaridade: ${patient.educationLevel}`);
  doc.text(`Telefone: ${patient.phoneNumber}`);
  doc.moveDown();

  // Dados médicos
  doc.fontSize(16).text(`Dados Médicos`, { underline: true });
  doc.moveDown();

  const add = (label: string, value: any) => {
    doc.text(
      `${label}: ${value !== null && value !== undefined ? value : 'N/A'}`
    );
  };

  add('Data do exame', medicalData.dateExam);
  add('IMC', medicalData.bmi);
  add('Peso (kg)', medicalData.weight);
  add('Altura (cm)', medicalData.height);
  add('Qualidade do sono', medicalData.sleepQuality ? 'Boa' : 'Ruim');
  add('Qualidade da dieta (0–10)', medicalData.dietQuality);
  add('LDL', medicalData.cholesterolLdl);
  add('HDL', medicalData.cholesterolHdl);
  add('Triglicerídeos', medicalData.cholesterolTriglycerides);
  add('Colesterol total', medicalData.cholesterolTotal);
  add('Pressão sistólica', medicalData.systolicBP);
  add('Pressão diastólica', medicalData.diastolicBP);
  add('Exercício físico?', medicalData.physicalActivity ? 'Sim' : 'Não');
  add('Tabagismo?', medicalData.smoking ? 'Sim' : 'Não');
  add('Consumo de álcool?', medicalData.alcoholConsumption ? 'Sim' : 'Não');
  doc.moveDown();

  doc.fontSize(16).text(`Histórico Médico`, { underline: true });
  doc.moveDown();
  add('Alzheimer na família?', medicalData.familyHistory ? 'Sim' : 'Não');
  add(
    'Doença cardiovascular?',
    medicalData.cardiovascularDisease ? 'Sim' : 'Não'
  );
  add('Diabetes?', medicalData.diabetes ? 'Sim' : 'Não');
  add('Depressão?', medicalData.depression ? 'Sim' : 'Não');
  add('Traumatismo craniano?', medicalData.headTrauma ? 'Sim' : 'Não');
  add('Hipertensão?', medicalData.hypertension ? 'Sim' : 'Não');
  doc.moveDown();

  doc.fontSize(16).text(`Funções Cognitivas`, { underline: true });
  doc.moveDown();
  add('MMSE (0–30)', medicalData.mmse);
  add('Atividades funcionais (0–10)', medicalData.functionalAssessment);
  add('Queixas de memória?', medicalData.memoryComplaints ? 'Sim' : 'Não');
  add(
    'Problemas comportamentais?',
    medicalData.behavioralProblems ? 'Sim' : 'Não'
  );
  add('ADL (0–10)', medicalData.adl);
  doc.moveDown();

  doc.fontSize(16).text(`Sintomas Cognitivos`, { underline: true });
  doc.moveDown();
  add('Confusão?', medicalData.confusion ? 'Sim' : 'Não');
  add('Desorientação?', medicalData.disorientation ? 'Sim' : 'Não');
  add(
    'Mudanças de personalidade?',
    medicalData.personalityChanges ? 'Sim' : 'Não'
  );
  add(
    'Dificuldade para completar tarefas?',
    medicalData.difficultyCompletingTasks ? 'Sim' : 'Não'
  );
  add('Esquecimento?', medicalData.forgetfulness ? 'Sim' : 'Não');

  doc.end();
};
