export type ApiClientConfig = {
  baseUrl: string;
};

export class ApiClient {
  constructor(private readonly config: ApiClientConfig) {}

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.config.baseUrl}${path}`);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }
}
