import * as yup from 'yup';

export const CreateMedicalDataValidator = yup.object().shape({
  bmi: yup.string().required('IMC é obrigatório'),
  sleep_quality: yup.string().required('Qualidade de sono é obrigatório'),
  cholesterol_ldl: yup.string().required('Colesterol LDL é obrigatório'),
  cholesterol_hdl: yup.string().required('Colesterol HDL é obrigatório'),
  cholesterol_triglycerides: yup
    .string()
    .required('Colesterol triglicerideos é obrigatório'),
  mmse: yup.string().required('Teste MMSE é obrigatório'),
  functional_assessment: yup
    .string()
    .required('Avaliação funcional é obrigatório'),
  memory_complaints: yup.string().required('Queixas de memória é obrigatório'),
  behavioral_problems: yup
    .string()
    .required('Problemas comportamentais é obrigatório'),
  adl: yup.string().required('ADL é obrigatório'),
  date_exam: yup.string().required('Data é obrigatório'),
});
