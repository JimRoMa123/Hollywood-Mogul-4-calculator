import axios from 'axios';
import { MovieFormData, CalculationResult, HistoryItem } from '../types/calculator.types';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

export const calculateMovie = async (data: MovieFormData): Promise<CalculationResult> => {
  const response = await API.post<CalculationResult>('/calculator/calculate', data);
  return response.data;
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await API.get<HistoryItem[]>('/history');
  return response.data;
};

export const deleteHistory = async (id: string): Promise<void> => {
  await API.delete(`/history/${id}`);
};
