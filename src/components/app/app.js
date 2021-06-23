import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import { CharactersPage, BooksPage, BooksItem, HousesPage } from '../pages';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import './app.css';

const MainPageTitle = styled.h1`
    font-size: 24px;
    color: #fff;
`;

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

                        <Row className='row'>
                            <Col lg={{ size: 5, offset: 15 }}>
                                {elemRandomChar}
                                <div className='.toggle-btn'>
                                    <Button color="success" onClick={this.toggleVisibleRandomChar}>
                                        Toggle Random Character
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <Switch>
                            <Route path='/' exact component={() => <MainPageTitle>WELCOME!!! This is - Main page</MainPageTitle>} />
                            <Route path='/characters' component={CharactersPage} />
                            <Route path='/houses' component={HousesPage} />
                            <Route path='/books' exact component={BooksPage} />
                            <Route path='/books/:id' render={
                                ({ match }) => {
                                    const { id } = match.params;
                                    return <BooksItem bookId={id} />
                                }
                            } />
                            <Route component={() => {
                                return (
                                    <>
                                        <MainPageTitle>404 Page not found...</MainPageTitle>
                                        <Link to='/'>
                                            <Button color="warning">
                                                go to the main page
                                            </Button>
                                        </Link>
                                    </>
                                )
                            }
                            } />
                        </Switch>
                    </Container>

                </div>
            </Router>
        );
    }
}