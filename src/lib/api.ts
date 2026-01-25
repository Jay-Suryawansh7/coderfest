import { Event, Monument, Story } from "./mockData";

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

    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            ...rest,
            // Cache control for Next.js - revalidate every minute
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.warn(`API Request failed: ${url}`, error);
        throw error;
    }
}

// ------------------------------------------------------------------
// API Methods
// ------------------------------------------------------------------

export const api = {
    // Heritage Sites
    getHeritageSites: async (page = 1, limit = 20, query = "") => {
        const res = await fetchAPI<{ data: Monument[] }>("/heritage", { params: { page, limit, q: query } });
        return res.data;
    },

    getHeritageSiteById: async (id: string) => {
        const res = await fetchAPI<{ data: Monument }>(`/heritage/${id}`);
        return res.data;
    },

    getNearbyHeritageSites: async (lat: number, lng: number, radius = 50) => {
        const res = await fetchAPI<{ data: Monument[] }>("/heritage/nearby", { params: { lat, lng, radius } });
        return res.data;
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
