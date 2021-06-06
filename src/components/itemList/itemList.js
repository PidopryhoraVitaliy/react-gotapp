import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;
        getData()
            .then((itemList) => {
                if (itemList.length === 0) {
                    this.setState({ error: true });
                    return;
                }
                this.setState({ itemList })
            })
            .catch((err) => {
                console.log(err);
                this.setState({ error: true });
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {

        const { itemList, error } = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        if (!itemList) {
            return <Spinner />
        }

        const Items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {Items}
            </ul>
        );
    }
}

