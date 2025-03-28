import { Class } from "@/interfaces/Class";
import { axiosInstanceWithToken } from "./axios";


export const createClass = async (classData: Class) => await axiosInstanceWithToken.post('/classes', classData);

export const editClass = async (id: number, classData: Class) => await axiosInstanceWithToken.put(`/classes/${id}`, classData);

export const getClasses = async () => await axiosInstanceWithToken.get('/classes');

export const getClass = async (id: number) => await axiosInstanceWithToken.get(`/classes/${id}`);

export const deleteClassById = async (id: number) => await axiosInstanceWithToken.delete(`/classes/${id}`);
