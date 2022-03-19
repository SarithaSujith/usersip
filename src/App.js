import './App.css';
import { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { DateTime } from 'luxon';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
	const [ip, setIp] = useState('');
	//const [data, setData] = useState();
	const [location, setLocation] = useState({});
	const [loading, setLoading] = useState(true);
	const [coordinates, setCoordinates] = useState([]);
	const [flagCode, setFlagCode] = useState('');

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

					setCoordinates([
						jsonResponse.location.lat,
						jsonResponse.location.lng,
					]);
					setFlagCode(jsonResponse.location.country.toLowerCase());
					setLoading(false);
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
	console.log(coordinates);
	//const myStyle = { width: '40rem',  align-items:'center' };
	return (
		<div className='card border-info mb-5'>
			{loading ? (
				<ListGroupItem>loading..</ListGroupItem>
			) : (
				<Card>
					<Map height={300} defaultCenter={coordinates} defaultZoom={11}>
						<Marker width={50} anchor={coordinates} />
					</Map>
					<Card.Body>
						<Card.Text style={{ width: '50rem', textAlign: ' center' }}>
							{' '}
							<h2>IP ADDRESS</h2>
						</Card.Text>
						<ListGroup
							className='list-group-flush'
							style={{ backgroundColor: 'blue' }}
						>
							<ListGroupItem>
								<ListGroupItem>
									<strong>Your IP is: </strong>
									{ip}
									<br />
									<strong>your Country: </strong>
									{location.country}
									<br />
									<strong>Your City: </strong>
									{location.city}
									<p>
										<strong> Your Country Flag:</strong>{' '}
										<img
											src={`https://flagcdn.com/20x15/${flagCode}.png`}
											alt={flagCode}
										/>
									</p>
									<p>
										<strong> Current Time:</strong>{' '}
										{DateTime.local().toLocaleString(DateTime.DATETIME_FULL)}
									</p>
								</ListGroupItem>
							</ListGroupItem>
						</ListGroup>
					</Card.Body>
				</Card>
			)}
		</div>
	);
}
export default App;
