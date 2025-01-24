import axios from "axios";
import { API } from "./useEnv";

export const instance = () => axios.create({ baseURL: API });
