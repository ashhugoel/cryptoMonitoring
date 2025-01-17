import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axiosInstance from '../api/axiosInstance.js'; // Adjust path as needed
import { saveAlertData } from '../api/marketpricefunction.js';
import './CoinDetails.css'
import { format } from 'date-fns';



import graphOptions from './chart.js';
import { Colors } from 'chart.js';

import {
    Chart as ChartJS,
    CategoryScale,

    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors);


const CoinDetails = () => {
    const { id } = useParams(); // Extract the dynamic 'id' from the URL
    console.log(id)
    const [coinData, setCoinData] = useState(null); // Coin details
    const [graphData, setGraphData] = useState([]); // Historical price data
    const [loading, setLoading] = useState(true); // Loading state
    const [days, setDays] = useState(7); //for days 
    const [loadingChart, setLoadingChart] = useState(true); // Loading state
    

    const handleDay = (day) => {
        setDays(day); // Update the days state
        setLoadingChart(true); // Immediately show the loading spinner
        fetchHistoricalData();

    }
    // Fetch coin details
    const fetchCoinData = async () => {
        try {
            const response = await axiosInstance.get(`/coins/markets`, {
                params: {
                    vs_currency: 'inr',
                    ids: id, // Filter by the dynamic coin ID
                },
            });
            console.log(response.data[0])
            setCoinData(response.data[0]); // Assuming the API returns an array
            setLoading(false);
        } catch (error) {
            console.error('Error fetching coin details:', error);
        }
    };

    // Fetch historical price data for the coin
    const fetchHistoricalData = async () => {
        try {
            const interval = 'daily';
            const response = await axiosInstance.get(`/coins/${id}/market_chart`, {
                params: {
                    vs_currency: 'inr',
                    days: days,
                    interval: interval,
                },
            });

            const prices = response.data.prices.map(([timestamp, price]) => {
                let formattedTime;
                formattedTime = format(new Date(timestamp), 'MM/dd/yyyy'); // Date format for 7 and 365 days
                return { time: formattedTime, price };
            });
            console.log(prices.length)
            if (prices.length == days+1) {
                setGraphData(prices);
                setLoadingChart(false);
            }
        } catch (error) {
            console.error('Error fetching historical data:', error);
            // setLoadingChart(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            await fetchHistoricalData();
        }, 3000);

        return () => {
            clearInterval(interval)
        }
    }, [days])


    // Fetch both details and historical data
    useEffect(() => {
        const fetchData = async () => {
            await fetchCoinData();
            console.log("fetching")
        };

        const interval = setInterval(async () => {
            await fetchData();
        }, 3000);
        return () => {
            clearInterval(interval)
        }
    }, [id]);

    if (loading) return <div className='loader'>

        <div class="spinner-border text-light"  role="status"></div>
    </div>;


    // Function to trigger the alert and show popups
    const handleAlert = async () => {
        // Step 1: Ask for the target price
        const targetPrice = prompt(`Enter the target price for ${coinData.name} (Current: ₹${coinData.current_price.toLocaleString()})`);

        if (!targetPrice || isNaN(targetPrice)) {
            alert('Please enter a valid target price.');
            return;
        }

        // Step 2: Ask for the email address
        const email = prompt('Enter your email address for the alert:');

        if (!email || !validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Step 00: Ask for the condition (<= or >=)
        const condition = prompt('Enter the condition for the alert (<= or >=):');

        if (condition !== '<=' && condition !== '>=') {
            alert('Please enter a valid condition if market price (<= or >=).');
            return;
        }

        // Step 4: Create the alert payload with condition
        const alertPayload = {
            userEmail: email,
            cryptoId: id,
            targetPrice: parseFloat(targetPrice),
            condition, // Adding the condition to the payload
        };

        // Step 5: Log the alert data to the console
        console.log('Alert Created:', alertPayload);
        await saveAlertData(alertPayload);

        alert('Alert created successfully!');
    };

    // Helper function to validate email format
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    // Chart.js data
    const graphDataset = {
        labels: graphData.map((point) => {
            return point.time
        }),
        datasets: [
            {
                label: 'Price (INR)',
                data: graphData.map((point) => point.price),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0, // Smooth curve
            },
        ],
    };

    return (
        <div className="container1 glass mt-5 ">
            <div className='grid-container2'>
                <div className="coin-image"><img src={coinData.image} alt={coinData.name} width="40" /></div>

                {/* CHART */}
                {(loadingChart) ?<div className='chart d-flex justify-content-center align-items-center'> <div class="spinner-border text-light" style={{width: '15rem', height: '15rem' }}role="status"></div> </div> :

                    <div className='chart text-center' >
                        <h3>Price History ({days} Days)</h3>

                        <div className="chart-container w-100 ">
                            <Line data={graphDataset} options={graphOptions} />
                        </div>
                    </div>}




                <div className='coin-name'> <h1>{coinData.name}</h1></div>

                <div className='coin-symbol'> <span>{coinData.symbol.toUpperCase()}</span></div>

                <div className='coin-price'> Price:<span> ₹ {coinData.current_price.toLocaleString()}</span></div>

                <div className='coin-price'> Market Cap:<span> ₹ {(coinData.market_cap / 1_000_000_000).toLocaleString()} B </span></div>

                <div className='coin-price'> Ath:<span> ₹ {coinData.ath.toLocaleString()} </span></div>

                <div className='d-flex justify-content-center'>
                    {/* Button to create an alert */}
                    <button onClick={handleAlert} className='btn-alert' >
                        Price Alert
                    </button>
                    <button onClick={() => { handleDay(7) }} className='btn-alert' >
                        7 day
                    </button>

                    <button onClick={() => { handleDay(30) }} className='btn-alert' >
                        30 day
                    </button>

                    <button onClick={() => { handleDay(365) }} className='btn-alert' >
                        365 days
                    </button>
                </div>


                <div className='coin-price'> Atl:<span> ₹ {coinData.atl.toLocaleString()} </span></div>





            </div>



        </div>
    );
};

export default CoinDetails;
