import { Class } from "@/interfaces/Class";
import { axiosInstanceWithToken } from "./axios";


export const createClass = async (classData: Class) => await axiosInstanceWithToken.post('/classes', classData);

export const getClasses = async () => await axiosInstanceWithToken.get('/classes');