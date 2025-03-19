import axiosInstance from "../services/axios";
import { User } from "../interfaces/User";

export const register = async (user: User) => await axiosInstance.post('/register', user);

export const login = async (user: User) => await axiosInstance.post('/login', user);