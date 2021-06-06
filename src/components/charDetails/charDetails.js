import React, { Component } from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';
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

export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        this.setState({
            loading: true,
            error: false
        });
        const { charId } = this.props;
        if (!charId) {
            return
        }
        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({
                    char,
                    loading: false
                })
            })
            .catch((err) => {
                //console.log('err', err);
                this.setState({ error: true });
            });
        //this.foo.bar = 0;
    }

    render() {

        const { char, loading, error } = this.state;

        if (error) {
            return <ErrorMessage />
        }

        if (!char) {
            return <span className='select-error'>Please select a character</span>
        }

        if (loading) {
            return <Spinner />;
        }

        const item = char;
        const {name} = char;

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