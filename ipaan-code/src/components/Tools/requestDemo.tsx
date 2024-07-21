import { useEffect } from 'react';

function Query() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://196.42.81.143:3000/execute-query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sql: `select
	AVG(x.meanthroughputmbps),y.city
from
	Download x
join
	descriptors y
on
	x.descriptorid = y.id
where
y.city IN ('Cape Town','Johannesburg','Pretoria') and date >= '2024-01-01' and date < '2024-02-01'
group by y.city`,
            params: [],
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>SQL Query Executor</h1>
    </div>
  );
}

export default Query;
