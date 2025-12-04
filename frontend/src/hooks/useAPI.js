//frontend/src/hooks/userAPI.js
import { useState } from "react";

export default function useApi(baseUrl = "http://127.0.0.1:8000") {
  const [loading, setLoading] = useState(false);

  const request = async (endpoint, method = "GET", body = null) => {
    try {
      setLoading(true);

      const config = {
        method,
        headers: {},
      };

      if (body && !(body instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
        config.body = JSON.stringify(body);
      } else if (body instanceof FormData) {
        config.body = body; // don't set headers
      }

      const res = await fetch(`${baseUrl}${endpoint}`, config);
      return await res.json();
    } finally {
      setLoading(false);
    }
  };

  return { request, loading };
}
