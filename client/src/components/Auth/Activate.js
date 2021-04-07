import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Activate = () => {
  const { activate_token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activate_token) {
      const activation = async () => {
        try {
          const res = await axios.post('/user/activate', {
            activate_token,
          });
          setMessage(res.data.message);
        } catch (error) {
          error.response.data.message &&
            setMessage(error.response.data.message);
        }
      };

      activation();
    }
  }, [activate_token]);

  return <div className="wrapper">{message}</div>;
};

export default Activate;
