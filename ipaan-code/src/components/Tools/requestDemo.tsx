import { useEffect } from 'react';

interface Requests {
    filters: {
        countries: string[];
        cities: string[];
        isps: string[];
    };
    startDate: string;
    endDate: string;
}

interface QueryProps {
    request: Requests;
    api: string;
    onDataFetched: (data: any) => void;
    shouldFetch: boolean;
}

function Query({ request, api, onDataFetched, shouldFetch }: QueryProps) {
    useEffect(() => {
        if (!shouldFetch) return;

        const fetchData = async () => {
            try {
                const response = await fetch(api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                });

                const data = await response.json();
                onDataFetched(data);
                console.log("Saved data");
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [shouldFetch, request, api, onDataFetched]);

    return null;
}

export default Query;
