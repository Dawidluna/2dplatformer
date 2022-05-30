import '../index.css';
import React from 'react';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: 5,
            maxYspeed: 10,
            left: false,
            right: false,
            jump: false
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.movePlayer);
        window.addEventListener('keyup', this.stopPlayer);
        this.clock = setInterval(() => {
            this.applyMove();
          }, 1000 / 60);
    }

    componentWillUnmount() {
        clearInterval(this.clock);
    }

    applyMove() {
        this.props.movePlayer(this.state.left, this.state.right, this.state.jump, this.state.speed, this.state.maxYspeed);
    }

    movePlayer = (event) => {
        let code = event.which || event.keyCode;
        switch(code) {
            case 37:
                this.setState({left: true});
                break;
            case 38:
                this.setState({jump: true});
                break;
            case 39:
                this.setState({right: true});
                break;
            case 82:
                this.props.restart();
                break;
        }
    }

    stopPlayer = (event) => {
        let code = event.which || event.keyCode;
        switch(code) {
            case 37:
                this.setState({left: false});
                break;
            case 38:
                this.setState({jump: false});
                break;
            case 39:
                this.setState({right: false});
                break;
        }
    }

    render() {
        return("");
    }
}