import React, { useEffect, useState } from 'react';
import axiosInstance from './api/axiosInstance.js';  // Import both axios instances
import { saveCryptoData } from './api/marketpricefunction.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Link } from 'react-router-dom';

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true); // Initially true

  // Fetch crypto data from CoinGecko API
  const fetchCryptoData = async () => {
    try {
      const response = await axiosInstance.get('/coins/markets', {
        params: {
          vs_currency: 'inr',
          order: 'market_cap_desc',
          per_page: 200, // Fetch maximum allowed data per request
          page: 1,
          sparkline: false,
        },
      });
      console.log('Fetch function ran');
      setCryptoData(response.data);
      setLoading(false); // Set loading to false after the first fetch

      // After fetching, save the data to your local database
      console.log(response.data);
      saveCryptoData(response.data); // Call the save function
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data every 10 seconds
    console.log("useeffect")
    fetchCryptoData();
    const interval = setInterval(() => {
      fetchCryptoData();
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className='loader'>
    <div class="spinner-border text-light"  role="status"></div>
  </div>;

  return (
    <>
      <h1 className='container1 heading'>Crypto Currency Price </h1>
      
      <div className="container1 glass">
        <div className='grid-container'>
          <div className='grid-item name'> Image</div>
          <div className='grid-item'> Name</div>
          <div className='grid-item'> Price</div>
          <div className='grid-item'> 24 hour </div>
          <div className='grid-item'> 24h low</div>
          <div className='grid-item'> 24h high</div>

          {cryptoData.map((crypto) => (
            <>
              <div className='grid-item name'>
                <img className='py-1' src={crypto.image} alt={crypto.name} width="40" />
              </div>

              <div className='grid-item'>
                <Link to={`/coin/${crypto.id}`} className='custom-link'>
                  {crypto.name}
                </Link>
              </div>


              <div className='grid-item'>
                ₹ {crypto.current_price.toLocaleString("en-IN")}
              </div>
              <div className={crypto.price_change_percentage_24h.toFixed(2)[0] == "-" ? ' grid-item red' : 'grid-item  green'} >
                {crypto.price_change_percentage_24h.toFixed(2)[0] == "-" ? '▼' + crypto.price_change_percentage_24h.toFixed(2) : "▲" + crypto.price_change_percentage_24h.toFixed(2)}
              </div>
              <div className='grid-item'>₹ {crypto.low_24h.toLocaleString("en-IN")}</div>
              <div className='grid-item'>₹ {crypto.high_24h.toLocaleString("en-IN")}</div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
