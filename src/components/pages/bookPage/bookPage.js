import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Fild} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BookPage extends Component {

    gotService = new GotService();

    state = {
        selectedId: null,
        error: false
    }

    componentDidCatch() {
        console.log('error BookPage');
        this.setState({ error: true });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedId: id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => `${item.id} - ${item.name}`}
            />
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedId}
                getItem={this.gotService.getBook}>
                <Fild field='name' label='Name'/>
                <Fild field='numberOfPages' label='Number of pages'/>
                <Fild field='publiser' label='Publiser'/>
                <Fild field='released' label='Released'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}