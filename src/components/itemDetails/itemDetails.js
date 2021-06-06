import React, { Component } from 'react';
import './itemDetails.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Fild = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {
    Fild
}

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem = () => {
        this.setState({
            loading: true,
            error: false
        });
        const { itemId } = this.props;
        if (!itemId) {
            return
        }
        this.props.getItem(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false
                })
            })
            .catch((err) => {
                console.log('err', err);
                this.setState({ error: true });
            });
        //this.foo.bar = 0;
    }

    render() {

        const { item, loading, error } = this.state;

        if (error) {
            return <ErrorMessage />
        }

        if (!item) {
            return <span className='select-error'>Please select a item</span>
        }

        if (loading) {
            return <Spinner />;
        }

        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>

            </div>
        );
    }
}