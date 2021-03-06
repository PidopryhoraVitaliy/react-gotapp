import React, {Component} from 'react';
import gotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
    
    state = {
        selectedBook: 5
    }
    
    gotService = new gotService();

    render () {
        return (
            <ItemDetails
            itemId={this.props.bookId}
            getItem={this.gotService.getBook} >
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}