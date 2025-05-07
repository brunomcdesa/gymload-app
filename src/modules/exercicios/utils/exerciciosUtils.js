import * as RegistroAtividadeApi from '../registrosAtividades/Api';

export const fetchDestaquesDosExercicios = async (
  exerciciosIds,
  setDadosRegistrosAtividades,
) => {
  try {
    if (!exerciciosIds || exerciciosIds.length === 0) return;
    const { data } =
      await RegistroAtividadeApi.fetchDestaquesDeExercicios(exerciciosIds);

    const dadosMap = {};
    data.forEach((destaque) => {
      dadosMap[destaque.exercicioId] = destaque;
    });

    setDadosRegistrosAtividades(dadosMap);
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Erro ao buscar destaques:', error.response.data);
    } else {
      console.error('Erro ao buscar destaques:', error);
    }
  }
};
