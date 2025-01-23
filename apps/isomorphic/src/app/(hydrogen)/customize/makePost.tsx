import { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [response, setResponse] = useState(null);

  const makePostRequest = async () => {
    try {
      const res = await axios.post(
        '/api/query',
        {
          query: 'Do you have any variants of silver minimal bead anklet?',
          user_id: '66096695',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_TOKEN_HERE',
          },
        }
      );
      setResponse(res.data); // Save the response data
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };
  console.log(response);
  return (
    <div>
      <button onClick={makePostRequest}>Send Request</button>
    </div>
  );
};

export default MyComponent;
