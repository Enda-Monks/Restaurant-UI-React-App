import { Card } from 'react-bootstrap';

export default function NotFound() {
    return (
    <>
        <br />
        <Card>
            <Card.Header> 
                <Card.Title>Not Found</Card.Title>
                <Card.Text>We can't find what you're looking for...</Card.Text>
            </Card.Header>
        </Card>
    </>
    )
}