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
  const responseClone = res.clone();
  
  if (responseClone.status === 401 || responseClone.status === 403) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Sesión expirada. Inicie sesión de nuevo.");
  }

  if (!responseClone.ok) {
    try {
      const errorData = await responseClone.json();
      throw new Error(errorData.message || `Error HTTP: ${responseClone.status}`);
    } catch {
      const errorText = await responseClone.text();
      throw new Error(errorText || `Error HTTP: ${responseClone.status}`);
    }
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

export const http = new HttpClient('http://localhost:3000');
