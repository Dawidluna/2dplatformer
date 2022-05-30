import '../index.css';
import React from 'react';
import Square from './Square';
import SelectBlock from './SelectBlock';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "b",
            level: [["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]]
        };
        this.placeBlock = this.placeBlock.bind(this);
        this.selectBlock = this.selectBlock.bind(this);
        this.save = this.save.bind(this);
    }

    placeBlock(row, col) {
        let level = this.state.level;
        if(this.state.selected == "s" || this.state.selected == "f") {
            for(let i=0; i<16; i++) {
                for(let j=0; j<16; j++) {
                    if(level[i][j] == this.state.selected) level[i][j] = "";
                }
            }
        }
        level[row][col] = this.state.selected;
        this.setState({level: level});
    }

    selectBlock(type) {
        this.setState({selected: type});
    }

    save() {
        let start = false;
        let finish = false;
        for(let i=0; i<16; i++) {
            for(let j=0; j<16; j++) {
                if(this.state.level[i][j] == "s") start = true;
                if(this.state.level[i][j] == "f") finish = true;
            }
        }
        if(start && finish) {
            let name = prompt("Podaj nazwę poziomu");
            this.props.addLevel(this.state.level, name);
        }
        else alert("Poziom musi zawierać start oraz początek!");
    }

    render() {
        let board = [];
        for(let i=0; i<16; i++) {
            let row = [];
            for(let j=0; j<16; j++) {
                let key = i + "sq" + j;
                row.push(<Square key={key} row={i} col={j} image={this.state.level[i][j]} placeBlock={this.placeBlock}/>);
            }
            board.push(row);
        }
        return(
            <div>
                <div className="blocks">
                    <SelectBlock image="https://i.ibb.co/7GGsf0f/block.png" type="b" select={this.selectBlock} selected={this.state.selected} />
                    <SelectBlock image="https://i.ibb.co/DzPtzHL/yaytso.webp" type="s" select={this.selectBlock} selected={this.state.selected} />
                    <SelectBlock image="https://i.ibb.co/GTXyDgk/finish.png" type="f" select={this.selectBlock} selected={this.state.selected} />
                </div>
                <div className="board">{board}</div>
                <div className="zapisz"><button onClick={this.save}>Zapisz poziom</button></div>
            </div>
        );
    }
}