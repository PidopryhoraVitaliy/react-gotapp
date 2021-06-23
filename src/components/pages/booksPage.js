import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import { withRouter } from 'react-router';

class BookPage extends Component {

    gotService = new GotService();

    state = {
        error: false
    }

    componentDidCatch() {
        console.log('error BookPage');
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(`${itemId}`)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => `${item.id} - ${item.name}`}
            />

        )
    }
}

export default withRouter(BookPage);