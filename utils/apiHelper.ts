import { APIRequestContext } from '@playwright/test';

export const API_BASE = 'https://automationexercise.com';

export async function apiGet(request: APIRequestContext, path: string) {
  return request.get(`${API_BASE}${path}`);
}

export async function apiPost(request: APIRequestContext, path: string, data: Record<string, string>) {
  return request.post(`${API_BASE}${path}`, { form: data });
}

export async function apiPut(request: APIRequestContext, path: string, data: Record<string, string>) {
  return request.put(`${API_BASE}${path}`, { form: data });
}

export async function apiDelete(request: APIRequestContext, path: string, data?: Record<string, string>) {
  return request.delete(`${API_BASE}${path}`, data ? { form: data } : undefined);
}

export function parseResponse(body: string): { responseCode: number; message?: string; [key: string]: unknown } {
  try {
    return JSON.parse(body);
  } catch {
    return { responseCode: 0, message: body };
  }
}