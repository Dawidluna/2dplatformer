import '../index.css';
import React from 'react';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        this.placeBlock = this.placeBlock.bind(this);
    }

    placeBlock() {
        this.props.placeBlock(this.props.row, this.props.col);
    }

    render() {
        let image="";
        switch(this.props.image) {
            case "b":
                image = "https://i.ibb.co/7GGsf0f/block.png";
                break;
            case "s":
                image = "https://i.ibb.co/DzPtzHL/yaytso.webp";
                break;
            case "f":
                image = "https://i.ibb.co/GTXyDgk/finish.png";
                break;
        }
        return(
            <div className="square" onClick={this.placeBlock}>
                <img src={image} />
            </div>
        );
    }
}