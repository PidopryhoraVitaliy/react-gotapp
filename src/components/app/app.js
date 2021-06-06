import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import GotService from '../../services/gotService';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


export default class App extends Component {

    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error App');
        this.setState({ error: true });
    }

    toggleVisibleRandomChar = () => {
        this.setState((state) => {
            return { showRandomChar: !state.showRandomChar }
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const { showRandomChar } = this.state;
        const elemRandomChar = showRandomChar ? <RandomChar /> : null;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {elemRandomChar}
                            <Button color="success" onClick={this.toggleVisibleRandomChar}>
                                Toggle Random Character
                            </Button>{' '}
                        </Col>
                    </Row>
                    <CharacterPage />
                </Container>
                <Row>
                    <Col md='6'>
                        <ItemList
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllBooks}
                            renderItem={(item) => `${item.id} - ${item.name}`}
                        />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar} />
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <ItemList
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllHouses}
                            renderItem={(item) => `${item.id} - ${item.name}`}
                        />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar} />
                    </Col>
                </Row>
            </>
        );
    }
}