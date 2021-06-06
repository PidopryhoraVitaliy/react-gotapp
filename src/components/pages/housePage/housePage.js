import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Fild} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class HousePage extends Component {

    gotService = new GotService();

    state = {
        selectedId: null,
        error: false
    }

    componentDidCatch() {
        console.log('error HousePage');
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
                getData={this.gotService.getAllHouses}
                renderItem={(item) => `${item.id} - ${item.name}`}
            />
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedId}
                getItem={this.gotService.getHouse}>
                <Fild field='name' label='Name'/>
                <Fild field='region' label='Region'/>
                <Fild field='words' label='Words'/>
                <Fild field='titles' label='Titles'/>
                <Fild field='overlord' label='Overlord'/>
                <Fild field='ancestralWeapons' label='Ancestral weapons'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}