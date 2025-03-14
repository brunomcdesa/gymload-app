import { axiosPublic } from "../../config/axios"
import { pMinDelay } from "../utils/promisse";


export const fetchHistoricoCargas = async ({ exercicioId, delay = 0 }) => {
    const response = axiosPublic.get(`/api/historico-cargas/${exercicioId}`);

    return pMinDelay(response, delay);
}