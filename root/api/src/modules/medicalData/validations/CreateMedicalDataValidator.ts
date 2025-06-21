import * as yup from 'yup';

export const CreateMedicalDataValidator = yup.object().shape({
  bmi: yup.string().required('IMC é obrigatório'),
  sleepQuality: yup.string().required('Qualidade de sono é obrigatório'),
  cholesterolLdl: yup.string().required('Colesterol LDL é obrigatório'),
  cholesterolHdl: yup.string().required('Colesterol HDL é obrigatório'),
  cholesterolTriglycerides: yup
    .string()
    .required('Colesterol triglicerideos é obrigatório'),
  mmse: yup.string().required('Teste MMSE é obrigatório'),
  functionalAssessment: yup
    .string()
    .required('Avaliação funcional é obrigatório'),
  memoryComplaints: yup.string().required('Queixas de memória é obrigatório'),
  behavioralProblems: yup
    .string()
    .required('Problemas comportamentais é obrigatório'),
  adl: yup.string().required('ADL é obrigatório'),
  dateExam: yup.string().required('Data é obrigatório'),
});
