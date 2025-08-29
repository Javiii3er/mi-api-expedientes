// src/services/http.ts
export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(extraHeaders?: HeadersInit): HeadersInit {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extraHeaders,
    };
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.status === 401 || res.status === 403) {
      // Token inválido o expirado → limpiar sesión y redirigir
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw new Error("Sesión expirada. Inicie sesión de nuevo.");
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `Error HTTP: ${res.status}`);
    }

    return res.json();
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const query = params
      ? "?" + new URLSearchParams(params as Record<string, string>).toString()
      : "";
    const response = await fetch(this.baseUrl + url + query, {
      method: "GET",
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(url: string, body: any): Promise<T> {
    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(url: string, body: any): Promise<T> {
    const response = await fetch(this.baseUrl + url, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(url: string, body: any): Promise<T> {
    const response = await fetch(this.baseUrl + url, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }
}

export const http = new HttpClient(import.meta.env.VITE_API_BASE_URL);