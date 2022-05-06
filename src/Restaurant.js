import { Card, CardDeck } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function Restaurant() {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    let {id} = useParams(); // get the "id" route parameter

    useEffect(() => { 
        setLoading(true);
        fetch(`https://stormy-lake-65777.herokuapp.com/api/restaurants/${id}`).then(res => res.json()).then(data => {
            setLoading(false);
            if(data.hasOwnProperty("_id")){
                setRestaurant(data);
            }
            else{
                setRestaurant(null);
            }
        });
    }, [id])

    if(!loading){
        if(!restaurant){
            return (  
                <>
                <br />
                <Card>
                    <Card.Header> 
                        <Card.Title>Unable to find Restaurant with id: {id}</Card.Title>
                    </Card.Header>
                </Card>
                </>)
        }else{
            return (
                <>
                <br />
                <Card>
                    <Card.Header> 
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>{restaurant.address.building} {restaurant.address.street}</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <MapContainer style={{"height": "400px"}} 
                        center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}> 
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
                            <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker> 
                        </MapContainer>
                        <br />
                        <CardDeck>
                        {restaurant.grades.map((grad) => (
                            <Card key={grad._id} >
                                <Card.Header>
                                    <Card.Title>Grade: {grad.grade}</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>Completed: {new Date(grad.date).toLocaleDateString()}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                        </CardDeck>

                    </Card.Body>
                </Card>
                </>)
        }
    }else{ // loading === true
            return (  
                <>
                <br />
                <Card>
                    <Card.Header> 
                        <Card.Title>Loading Restaurant Data...</Card.Title>
                    </Card.Header>
                </Card>
                </>
        )
    }
}