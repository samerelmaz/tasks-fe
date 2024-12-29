interface RequestOptions extends RequestInit {
  url: string;
  options?: RequestInit;
}

export const fetcher = async <T>(request: RequestOptions): Promise<T> => {
  const { url, options } = request;

  const headers: HeadersInit = { "Content-Type": "application/json" };

  const response = await fetch(url, {
    headers,
    ...options,
  });

  if (response.status === 204) {
    return {} as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
};
