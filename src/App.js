import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiDetails from './configs/apiConfigs';
import './App.css';
import Home from './components/Homepage';
function App() {
  let [token, setToken] = useState('');
  useEffect(() => {
    axios
      .post(
        apiDetails.getToken.url,
        {},
        { headers: apiDetails.getToken.headers }
      )
      .then(res => {
        setToken(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return <Home token={token} />;
}

export default App;
