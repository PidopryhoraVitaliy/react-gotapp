import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import { CharactersPage, BooksPage, BooksItem, HousesPage } from '../pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
            <Router>
                <div className="app">
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

                        <Route path='/' exact component={() => <h1>Main page</h1>} />
                        <Route path='/characters' component={CharactersPage} />
                        <Route path='/houses' component={HousesPage} />
                        <Route path='/books' exact component={BooksPage} />
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            }
                        } />

                    </Container>
                </div>
            </Router>
        );
    }
}