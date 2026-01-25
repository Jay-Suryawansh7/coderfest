// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type RequestOptions = RequestInit & {
    params?: Record<string, string | number>;
};

async function fetchAPI<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...rest } = options;

    let url = `${API_BASE_URL}${endpoint}`;

    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, String(value));
        });
        url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        ...rest,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

// ------------------------------------------------------------------
// API Methods
// ------------------------------------------------------------------

export const api = {
    // Heritage Sites
    getHeritageSites: (page = 1, limit = 20, query = "") => {
        return fetchAPI<any>("/heritage", { params: { page, limit, q: query } });
    },

    getHeritageSiteById: (id: string) => {
        return fetchAPI<any>(`/heritage/${id}`);
    },

    getNearbyHeritageSites: (lat: number, lng: number, radius = 50) => {
        return fetchAPI<any>("/heritage/nearby", { params: { lat, lng, radius } });
    },

    discoverHeritage: (location: string, radius = 50, categories: string[] = []) => {
        return fetchAPI<any>("/heritage/discover", {
            method: "POST",
            body: JSON.stringify({ location, radius, categories })
        });
    },

    // Chat
    chat: (message: string, conversationId?: string) => {
        return fetchAPI<any>("/chat", {
            method: "POST",
            body: JSON.stringify({ message, conversationId }),
        });
    },

    // Health
    checkHealth: () => {
        return fetchAPI<any>("/health");
    }
};
