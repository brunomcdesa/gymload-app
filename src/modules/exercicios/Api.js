import { axiosPublic } from "../../config/axios"
import { pMinDelay } from "../utils/promisse";


export const fetchExercicios = async (delay = 0) => {
    const response = axiosPublic.get('/api/exercicios');

    return pMinDelay(response, delay);
}