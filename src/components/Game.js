import '../index.css';
import React from 'react';
import Editor from './Editor';
import Play from './Play';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: 0,
            levels: [[["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "f", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "b", "b", "b", "b"],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "b", "b", "b", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "b", "b", "b", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "b", "b", "b", "b", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "s", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]],
            [["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "s", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "f", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "b", "b", "b", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]]],
            levelNames: ["pierwszy", "ten drugi"]
        };
        this.switchEditor = this.switchEditor.bind(this);
        this.addLevel = this.addLevel.bind(this);
    }

    switchEditor(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({editor: value});
    }

    addLevel(level, name) {
        let levels = this.state.levels;
        let levelNames = this.state.levelNames;
        levels.push(level);
        levelNames.push(name);
        this.setState({levels: levels, levelNames: levelNames});
        alert("Dodano poziom pomyślnie!");
    }

    render(){
        var mode = <Play levels={this.state.levels} levelNames={this.state.levelNames} />;
        if(this.state.editor) mode = <Editor addLevel={this.addLevel}/>;
        return(
            <div className="game">
                <input type="checkbox" checked={this.state.editor} onChange={this.switchEditor} /> Edytor poziomów<br />
                {mode}
            </div>
        );
    }
}