import './App.css';
import { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { DateTime } from 'luxon';
function App() {
	const [ip, setIp] = useState('');
	//const [data, setData] = useState();
	const [location, setLocation] = useState({});
	const [loading, setLoading] = useState(false);
	const [coordinates, setCoordinates] = useState([48.87563, 9.39819]);
	const [flagCode, setFlagCode] = useState('de');
	const flag = ` https://flagcdn.com/20x15/${flagCode}.png`;
	const flagAlt = `https://flagcdn.com/${flagCode}/codes.json`;
	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			try {
				const response = await fetch(
					`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}`
				);
				if (response.ok) {
					const jsonResponse = await response.json();
					console.log('response', jsonResponse);
					// IP
					setIp(jsonResponse.ip);
					console.log('here', jsonResponse);
					//setData(jsonResponse);
					// location
					console.log(jsonResponse.location);
					setLocation(jsonResponse.location);
					setLoading(false);
					setCoordinates([jsonResponse.lat, jsonResponse.lng]);
					console.log('setCoordinates', coordinates);
				} else {
					console.error('Request failed!');
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getData();
	}, []);
	return (
		<div>
			<h2>IP ADDRESS</h2>
			{loading ? (
				<p>loading..</p>
			) : (
				<p>
					Your IP is: {ip}
					<br />
					your country: {location.country}
					<br />
					Your City: {location.city}
				</p>
			)}
			{/* // <p>Your ip:{ip}</p> */}
			{/* <p>Your City:{location.city}</p>
            <p>Your Country:{location.country}</p> */}
			<p>
				Your Country flag:
				<img src={flag} alt={flagAlt} />
			</p>
			<Map height={300} defaultCenter={coordinates} defaultZoom={11}>
				<Marker width={50} anchor={coordinates} />
			</Map>
			<p> {DateTime.local().toLocaleString(DateTime.DATETIME_FULL)}</p>
		</div>
	);
}
export default App;
