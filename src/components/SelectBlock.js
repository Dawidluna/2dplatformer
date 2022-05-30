import '../index.css';
import React from 'react';

export default class SelectBlock extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }

    select() {
        this.props.select(this.props.type);
    }

    render() {
        let selectClass;
        if(this.props.selected == this.props.type) selectClass = "selectBlock selected";
        else selectClass = "selectBlock";
        return(
            <div className={selectClass} onClick={this.select}>
                <img src={this.props.image} />
            </div>
        );
    }
}