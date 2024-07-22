import { useEffect } from 'react';

interface Requests {
  filters: {
    countries: string[]; // Array of country codes
    cities: string[]; // Array of city names
    isps: string[]; // Array of ISP names (if needed)
  };
  startDate: string;
  endDate: string;
}

interface QueryProps {
  request: Requests;
  api: string
  onDataFetched: (data: any) => void;
}

function Query({ request,api, onDataFetched }: QueryProps) {
  useEffect(() => {
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
        onDataFetched(data); // Call the callback with the fetched data
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [request, api, onDataFetched]); 

  return null; 
}

export default Query;
