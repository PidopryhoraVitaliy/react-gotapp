import React, { Component } from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                if (charList.length === 0) {
                    this.setState({ error: true });
                    return;
                }
                this.setState({ charList })
            })
            .catch(() => {
                this.setState({ error: true });
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            return (
                <li className="list-group-item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const { charList, error } = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        if (!charList) {
            return <Spinner />
        }

        const Items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {Items}
            </ul>
        );
    }
}

