import React, {Component} from 'react';
import './itemList.css';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class ItemList extends Component {

    render() {
        return (
            <ListGroup>
                <ListGroupItem>
                    John Snow
                </ListGroupItem>
                <ListGroupItem>
                    Brandon Stark
                </ListGroupItem>
                <ListGroupItem>
                    Geremy
                </ListGroupItem>
                <ListGroupItem>
                    test
                </ListGroupItem>
            </ListGroup>
            /*<ul className="item-list list-group">
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ul>*/
        );
    }
}