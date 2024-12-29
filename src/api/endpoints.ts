const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export const endpoints = {
  tasks: {
    getAll: `${API_BASE_URL}/tasks`,
    create: `${API_BASE_URL}/tasks`,
    update: (id: string) => `${API_BASE_URL}/tasks/${id}`,
    delete: (id: string) => `${API_BASE_URL}/tasks/${id}`,
  },
};
