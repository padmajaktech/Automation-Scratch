import { APIRequestContext } from '@playwright/test';
import { apiDelete, apiGet, apiPost, apiPut, parseResponse } from '../utils/apiHelper';

/** Central routes and helpers for automationexercise.com APIs (POM-style API layer). */
export class AutomationExerciseApi {
  constructor(private readonly request: APIRequestContext) {}

  async getProductsList() {
    const res = await apiGet(this.request, '/api/productsList');
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async postProductsList() {
    const res = await apiPost(this.request, '/api/productsList', {});
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async getBrandsList() {
    const res = await apiGet(this.request, '/api/brandsList');
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async putBrandsList() {
    const res = await apiPut(this.request, '/api/brandsList', {});
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async searchProduct(searchProduct: string) {
    const res = await apiPost(this.request, '/api/searchProduct', { search_product: searchProduct });
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async searchProductEmpty() {
    const res = await apiPost(this.request, '/api/searchProduct', {});
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async verifyLogin(email: string, password: string) {
    const res = await apiPost(this.request, '/api/verifyLogin', { email, password });
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async verifyLoginPasswordOnly(password: string) {
    const res = await apiPost(this.request, '/api/verifyLogin', { password });
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async deleteVerifyLogin() {
    const res = await apiDelete(this.request, '/api/verifyLogin');
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async createAccount(data: Record<string, string>) {
    const res = await apiPost(this.request, '/api/createAccount', data);
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async deleteAccount(email: string, password: string) {
    const res = await apiDelete(this.request, '/api/deleteAccount', { email, password });
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async updateAccount(data: Record<string, string>) {
    const res = await apiPut(this.request, '/api/updateAccount', data);
    return { status: res.status(), body: parseResponse(await res.text()) };
  }

  async getUserDetailByEmail(email: string) {
    const res = await apiGet(this.request, `/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`);
    return { status: res.status(), body: parseResponse(await res.text()) };
  }
}
