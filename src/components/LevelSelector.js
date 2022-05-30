import '../index.css';
import React from 'react';

export default class LevelSelector extends React.Component {
    constructor(props) {
        super(props);
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(event) {
        this.props.changeLevel(event.target.value);
    }

    render() {
        let options = [];
        for(let i=0; i < this.props.levelNames.length; i++) {
            options.push(<option key={i} value={i}>{this.props.levelNames[i]}</option>);
        }
        return(
            <div>
                Poziom: <select onChange={this.changeLevel}>
                    {options}
                </select>
            </div>
        );
    }
}