/**
 * CineRise Auth API Client
 * Typed fetch wrapper for all /api/auth endpoints.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type Role = "FILMMAKER" | "CREW" | "ORGANIZATION";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  preferredLanguage: string;
  profileImage: string | null;
  status: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: AuthUser;
    token: string;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  preferredLanguage?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Something went wrong");
  }

  return data as T;
}

export const authApi = {
  register(payload: RegisterPayload): Promise<AuthResponse> {
    return request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  login(payload: LoginPayload): Promise<AuthResponse> {
    return request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getMe(token: string): Promise<{ success: boolean; data?: { user: AuthUser } }> {
    return request("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
