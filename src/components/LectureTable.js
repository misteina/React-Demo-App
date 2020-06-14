import React from 'react';

export default class LectureTable extends React.Component {
    constructor() {
        super();
        this.today = new Date().getDay();
        this.handleChange = this.handleChange.bind(this);
        this.weekDay = this.weekDay.bind(this);
        this.saveData = this.saveData.bind(this);

        this.data = JSON.parse(localStorage.getItem("lecture"));
        this.state = { data: this.data };
        if (this.data === null) {
            this.data = [];
            for (var i = 0; i < 7; i++) this.data[i] = [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']];
            this.state = { data: this.data };
        }
    }
    handleChange(e) {
        var input = e.target.value.trim();
        if (input.length > 0) {
            let cell = e.target.dataset.cell;
            let row = parseInt(cell[0]);
            let block = parseInt(cell[1]);
            this.data[this.today][row][block] = input;
        } else {
            this.data[this.today][row][block] = '';
        }
        this.setState(state => ({ data: this.data }));
    }
    weekDay(e) {
        this.today = parseInt(e.target.value);
        this.setState(state => ({ data: this.data }));
    }
    saveData() {
        localStorage.setItem("lecture", JSON.stringify(this.data));
        alert('Saved');
    }
    render() {
        return (
            <React.Fragment>
                <select id="select3" value={this.today} onChange={this.weekDay}>
                    <option value="0">Sunday</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                </select>
                <div id="table">
                    <div className="heading"><div className="th">Course</div><div className="th">Time</div></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="00" className="column4" value={this.state.data[this.today][0][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="01" className="column5" value={this.state.data[this.today][0][1]} onChange={this.handleChange} /></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="10" className="column4" value={this.state.data[this.today][1][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="11" className="column5" value={this.state.data[this.today][1][1]} onChange={this.handleChange} /></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="20" className="column4" value={this.state.data[this.today][2][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="21" className="column5" value={this.state.data[this.today][2][1]} onChange={this.handleChange} /></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="30" className="column4" value={this.state.data[this.today][3][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="31" className="column5" value={this.state.data[this.today][3][1]} onChange={this.handleChange} /></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="40" className="column4" value={this.state.data[this.today][4][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="41" className="column5" value={this.state.data[this.today][4][1]} onChange={this.handleChange} /></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="50" className="column4" value={this.state.data[this.today][5][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="51" className="column5" value={this.state.data[this.today][5][1]} onChange={this.handleChange} /></div>
                    <div className="row"><input type="text" maxLength="10" data-cell="60" className="column4" value={this.state.data[this.today][6][0]} onChange={this.handleChange} /><input type="text" maxLength="10" data-cell="61" className="column5" value={this.state.data[this.today][6][1]} onChange={this.handleChange} /></div>
                </div>
                <div className="basebutton"><input type="button" className="button" value="Save" onClick={this.saveData} /></div>
            </React.Fragment>
        );
    }
}