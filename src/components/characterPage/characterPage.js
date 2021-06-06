import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import ItemList from '../itemList';
import CharDetails, {Fild} from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: null,
        error: false
    }

    componentDidCatch() {
        console.log('error CharacterPage');
        this.setState({ error: true });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={(item) => `${item.id} - ${item.name} (${item.gender})`}
            />
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedChar}>
                <Fild field='gender' label='Gender'/>
                <Fild field='born' label='Born'/>
                <Fild field='died' label='Died'/>
                <Fild field='culture' label='Culture'/>
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}