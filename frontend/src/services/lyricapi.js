import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:9999';

const lyricApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default lyricApiClient;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Game from '../components/Game';

// const DisplayData = () => {
//   const [apiData, setApiData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:9999/lyrics/?artist=Karol%20G&song=Verano%20Rosa');
//         setApiData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>API Data Display</h2>
//       {apiData ? (
//         // Render your component using the fetched data
//         <Game data={apiData} />
//       ) : (
//         // Render a loading state or placeholder
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default DisplayData;