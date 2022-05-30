import '../index.css';
import React from 'react';
import LevelSelector from './LevelSelector';
import Player from './Player';

export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 0,
            playerX: 0,
            playerY: 0,
            playerSpawned: false,
            blockImage: "",
            finishImage: "",
            playerImage: "",
            ySpeed: 0,
            gravity: 0.3,
            isInAir: true,
            win: false
        };
        this.canvas = React.createRef();
        this.changeLevel = this.changeLevel.bind(this);
        this.drawLevel = this.drawLevel.bind(this);
        this.spawnPlayer = this.spawnPlayer.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
        this.checkCollisions = this.checkCollisions.bind(this);
        this.moveVertically = this.moveVertically.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.restart = this.restart.bind(this);
    }

    drawLevel() {
        const blockImage = this.state.blockImage;
        const finishImage = this.state.finishImage;
        const ctx = this.canvas.getContext('2d');
        ctx.canvas.height = 640;
        ctx.canvas.width = 640;
        ctx.fillStyle = '#c5dde6';
        ctx.fillRect(0, 0, 640, 640);
        if(blockImage.complete && finishImage.complete) {
        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
                if(this.props.levels[this.state.level][i][j] == "b") ctx.drawImage(blockImage, j*40, i*40);
                if(this.props.levels[this.state.level][i][j] == "f") ctx.drawImage(finishImage, j*40, i*40);
            }
        }
    }
    }

    componentDidMount() {
        var blockImage = new Image();
        blockImage.src = 'https://i.ibb.co/7GGsf0f/block.png';
        var finishImage = new Image();
        finishImage.src = 'https://i.ibb.co/GTXyDgk/finish.png';
        var playerImage = new Image();
        playerImage.src = "https://i.ibb.co/DzPtzHL/yaytso.webp";
        this.setState({blockImage: blockImage, finishImage: finishImage, playerImage: playerImage});
        this.clock = setInterval(() => {
            this.moveVertically();
            this.drawLevel();
            this.drawPlayer();
            this.checkWin();
          }, 1000 / 60);
    }

    componentWillUnmount() {
        clearInterval(this.clock);
    }

    spawnPlayer() {
        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
               if(this.props.levels[this.state.level][i][j] == "s") this.setState({playerX: j*40, playerY: i*40, playerSpawned: true});
            }
        }
    }

    drawPlayer() {
        const playerImage = this.state.playerImage;
        const ctx = this.canvas.getContext('2d');
        const playerX = this.state.playerX;
        const playerY = this.state.playerY;
        if(playerImage.complete) ctx.drawImage(playerImage, playerX, playerY);
    }

    movePlayer(left, right, jump, speed, maxYSpeed) {
        if(left && this.state.playerX>1 && !this.checkCollisions(this.state.playerX - speed, this.state.playerY)) {
            this.setState(prevState => {
                return {playerX: prevState.playerX - speed}
             });
        }
        if(right && this.state.playerX<606 && !this.checkCollisions(this.state.playerX + speed, this.state.playerY)) {
            this.setState(prevState => {
                return {playerX: prevState.playerX + speed}
             });
        }
        if(jump && !this.state.isInAir) {
            this.setState({ySpeed: maxYSpeed});
            this.setState(prevState => {
                return {playerY: prevState.playerY - maxYSpeed}
             });
        }
    }

    moveVertically() {
        var playerX = this.state.playerX;
        var playerY = this.state.playerY;
        var ySpeed = this.state.ySpeed;
        const gravity = this.state.gravity;
        var isInAir = true;
        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
                if(this.props.levels[this.state.level][i][j] == "b") {
                    if((playerX < j*40+40 && playerX > j*40-33) && (playerY >= i*40-40 && playerY <= i*40-20)) {
                        isInAir = false;
                        playerY = i*40-40;
                    }
                    if((playerX < j*40+40 && playerX > j*40-33) && (playerY <= i*40+40 && playerY >= i*40+30)) {
                        ySpeed = 0;
                        playerY = i*40+40;
                    }
                }
            }
        }
        if(isInAir) {
            ySpeed -= gravity;
            playerY -= ySpeed;
        }
        else ySpeed = 0;
        this.setState({playerY: playerY, ySpeed: ySpeed, isInAir: isInAir});
    }

    checkCollisions(playerX, playerY) {
        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
                if(this.props.levels[this.state.level][i][j] == "b") {
                    if((playerX < j*40+40 && playerX > j*40+30) && (playerY > i*40-40 && playerY < i*40+40)) return true;
                    else if((playerX+33 > j*40 && playerX+33 < j*40+10) && (playerY > i*40-40 && playerY < i*40+40)) return true;
                }
            }
        }
        return false;
    }

    checkWin() {
        let playerX = this.state.playerX;
        let playerY = this.state.playerY;
        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
                if(this.props.levels[this.state.level][i][j] == "f") {
                    if((playerX < j*40+40 && playerY < i*40+40) && (playerX > j*40-33 && playerY > i*40-40)) this.setState({win: true});
                }
            }
        }
    }

    changeLevel(level) {
        this.setState({level: level, playerSpawned: false, win: false});
    }

    restart() {
        this.spawnPlayer();
        this.setState({win: false});
    }

    render() {
        let winText;
        if(this.state.win) winText = "Wygrana!";
        else winText = "";
        if(!this.state.playerSpawned) this.spawnPlayer();
        return(
            <div>
                <br /><LevelSelector levelNames={this.props.levelNames} changeLevel={this.changeLevel}/><br/>
                <canvas ref={canvas => this.canvas = canvas} />
                <Player playerX={this.state.playerX} playerY={this.state.playerY} ctx={this.state.ctx} movePlayer={this.movePlayer} restart={this.restart} />
                <div className="win">{winText}</div>
                <div className="sterowanie">
                    Strzałki - ruch<br />
                    R - restart
                </div>
            </div>
        );
    }
}