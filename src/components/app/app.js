import React, { Component } from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';

export default class App extends Component {

    constructor() {
        super();
    }

    state = {
        showRandomChar: true
    }

    toggleVisibleRandomChar = () => {
        this.setState({showRandomChar: !this.state.showRandomChar});
    }

    render() {

        const { showRandomChar } = this.state;
        const elemRandomChar = showRandomChar ? <RandomChar/> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {elemRandomChar}
                        </Col>
                    </Row>
                    <Row mb='5'>
                        <Col lg={{size: 5, offset: 0}}>
                            <Button color="success" onClick={this.toggleVisibleRandomChar}>
                                Toggle Random Character
                            </Button>{' '}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}