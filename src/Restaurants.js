import { Card, Table } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Restaurants() {
   
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let location = useLocation();
    const perPage = 10;
    
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        let borough = urlParams.get("borough"); 
        setLoading(true);
        fetch( borough ? `https://stormy-lake-65777.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}` : `https://stormy-lake-65777.herokuapp.com/api/restaurants?page=${page}&perPage=10`).then(res=>res.json()).then(data=>{
            setLoading(false);
            setRestaurants(data);
        })
    }, [page, location]); 

    const previousPage = () => {
        if (page > 1) {  
            setPage(prevPage => prevPage - 1);
        }
    }
    
    const nextPage = () => {
            setPage(prevPage => prevPage + 1);
    }
    
    if(!loading){
        if(!restaurants || restaurants.length === 0){
            return ( 
                <>
                <br />
                <Card>
                    <Card.Header> 
                        <Card.Title>No Restaurants Found</Card.Title>
                    </Card.Header>
                </Card>
                </>)
        }else{ // restaurants are found
            return (
                <>
                <br />
                <Card>
                    <Card.Header> 
                        <Card.Title>Restaurant List</Card.Title>
                        <Card.Text>A full list of restaurants. Optionally sorted by borough.</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Borough</th>
                                    <th>Cuisine</th>
                                </tr>
                            </thead>
                            <tbody>
                            {restaurants.map((restaurant) => (
                                <tr key={restaurant._id} onClick={()=>{ navigate(`/restaurant/${restaurant._id}`)}}>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.address.building} {restaurant.address.street}</td>
                                    <td>{restaurant.borough}</td> 
                                    <td>{restaurant.cuisine}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Pagination>
                            <Pagination.Prev onClick={()=>{ previousPage()}}/>
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={()=>{ nextPage()}}/>
                        </Pagination>
                    </Card.Footer>
                </Card>
                </>)
        }
    }else{ // loading === true
        return (  
            <>
            <br />
            <Card>
                <Card.Header> 
                    <Card.Title>Loading...</Card.Title>
                </Card.Header>
            </Card>
            </>)
    }
  
}