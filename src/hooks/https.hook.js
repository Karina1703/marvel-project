import { useState, useCallback } from "react";

export const UseHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {
        setLoading(true)

        try {
            const result = await fetch(url, body, headers)
            const data = result.json();
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false);
            setError(true)
            throw e
        }


    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return { loading, request, error, clearError }

}