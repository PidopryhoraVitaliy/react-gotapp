import React, { Component } from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

export default class App extends Component {

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error App');
        this.setState({error: true});
    }

    toggleVisibleRandomChar = () => {
        this.setState( (state) => {
            return {showRandomChar: !state.showRandomChar}
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

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
                            <Button color="success" onClick={this.toggleVisibleRandomChar}>
                                Toggle Random Character
                            </Button>{' '}
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        );
    }
}