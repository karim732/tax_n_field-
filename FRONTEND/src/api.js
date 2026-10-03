import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 8000,
});

// High-performance client-side memory cache with TTL (Time-To-Live)
const memoryCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const getServices = async (forceRefresh = false) => {
    const cacheKey = "all_services";

    if (!forceRefresh) {
        const cached = memoryCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            return cached.data;
        }

        try {
            const stored = sessionStorage.getItem(cacheKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
                    memoryCache.set(cacheKey, parsed);
                    return parsed.data;
                }
            }
        } catch {
            // Ignore storage quota/security errors
        }
    }

    const response = await API.get("/services/");
    const cachePayload = { timestamp: Date.now(), data: response.data };

    memoryCache.set(cacheKey, cachePayload);
    try {
        sessionStorage.setItem(cacheKey, JSON.stringify(cachePayload));
    } catch {
        // Ignore storage errors
    }

    return response.data;
};

export const getServicesByCategory = async (category) => {
    const cacheKey = `category_${category}`;
    const cached = memoryCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
    }

    const response = await API.get(`/services/?category=${category}`);
    memoryCache.set(cacheKey, { timestamp: Date.now(), data: response.data });
    return response.data;
};

export const createEnquiry = async (enquiryData) => {
    const response = await API.post("/enquiries/", enquiryData);
    return response.data;
};

export default API;
