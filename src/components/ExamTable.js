import React from 'react';

export default class ExamTable extends React.Component {
    constructor() {
        super();
        this.today = new Date().getDay();
        this.handleChange = this.handleChange.bind(this);
        this.changeDay = this.changeDay.bind(this);
        this.changeWeek = this.changeWeek.bind(this);
        this.saveData = this.saveData.bind(this);

        this.data = JSON.parse(localStorage.getItem("exam"));
        this.state = { data: this.data };
        if (this.data === null) {
            var store = [[], [], []];
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 7; j++) {
                    store[i][j] = [['', ''], ['', ''], ['', ''], ['', '']];
                }
            }
            this.data = [store, 0];
        }
    }
    handleChange(e) {
        var input = e.target.value;
        if (input.trim().length > 0) {
            const { cell } = e.target.dataset;
            const row = parseInt(cell[0]);
            const block = parseInt(cell[1]);
            this.data[0][this.data[1]][this.today][row][block] = input;
        } else {
            this.data[0][this.data[1]][this.today][row][block] = '';
        }
        this.setState(state => ({ data: this.data }));
    }
    changeDay(e) {
        this.today = e.target.value;
        this.setState(state => ({ data: this.data }));
    }
    changeWeek(e) {
        var week = e.target.value;
        this.data[1] = week;
        localStorage.setItem("exam", JSON.stringify(this.data));
        this.setState(state => ({ data: this.data }));
    }
    saveData() {
        localStorage.setItem("exam", JSON.stringify(this.data));
        alert('Saved');
    }
    render() {
        return (
            <React.Fragment>
                <select id="select2" value={this.data[1]} onChange={this.changeWeek}>
                    <option value="0">Week 1</option>
                    <option value="1">Week 2</option>
                    <option value="2">Week 3</option>
                </select>
                <select id="select" value={this.today} onChange={this.changeDay}>
                    <option value="0">Sunday</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                </select>
                <div className="heading"><div className="th">Course</div><div className="th">Time</div></div>
                <div id="table">
                    <div className="row"><input type="text" maxLength="10" data-cell="00" className="column4" value={this.state.data[0][this.data[1]][this.today][0][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="01" className="column5" value={this.state.data[0][this.data[1]][this.today][0][1]} onChange={this.handleChange} /></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="10" className="column4" value={this.state.data[0][this.data[1]][this.today][1][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="11" className="column5" value={this.state.data[0][this.data[1]][this.today][1][1]} onChange={this.handleChange} /></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="20" className="column4" value={this.state.data[0][this.data[1]][this.today][2][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="21" className="column5" value={this.state.data[0][this.data[1]][this.today][2][1]} onChange={this.handleChange} /></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="30" className="column4" value={this.state.data[0][this.data[1]][this.today][3][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="31" className="column5" value={this.state.data[0][this.data[1]][this.today][3][1]} onChange={this.handleChange} /></div>
                </div>
                <div className="basebutton"><input type="button" className="button" value="Save" onClick={this.saveData} /></div>
            </React.Fragment>
        );
    }
}