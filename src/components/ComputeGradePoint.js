import React from 'react';

export default class ComputeGradePoint extends React.Component {
    constructor() {
        super();
        this.storeCourses = this.storeCourses.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.compute = this.compute.bind(this);
        this.goBack = this.goBack.bind(this);
        this.reset = this.reset.bind(this);
        this.data = JSON.parse(localStorage.getItem('grade'));
        if (this.data === null) {
            this.data = [[], null];
            this.state = { data: this.data, view: "courses" };
        } else {
            this.state = { data: this.data, view: "table" };
        }
    }
    handleChange(e) {
        const { cell } = e.target.dataset;
        const row = parseInt(cell[0]);
        const block = parseInt(cell[1]);
        const str = e.target.value;
        const val = parseInt(e.target.value);
        if ((block === 0 && /^[a-z0-9\s]*$/i.test(str))) {
            this.data[0][row][block] = str.toUpperCase();
        } else if ((block === 1 && !isNaN(val) && val > 0 && val <= 10) || val.length === 0) {
            this.data[0][row][block] = val;
        } else if ((block === 2 && /^[a-f]$/i.test(str)) || str.length === 0) {
            this.data[0][row][block] = str.trim().toUpperCase();
        } else {
            e.target.style.color = "red";
            return;
        }
        this.setState((state) => ({ data: this.data, view: "table" }));
    }
    storeCourses() {
        var courses = parseInt(this.refs.courses.value);
        if (isNaN(courses) || courses > 20) {
            alert('Please enter a valid number of courses.');
            return;
        } else {
            this.data[1] = courses;
            for (var i = 0; i < courses; i++) this.data[0][i] = ['Course ' + (i + 1).toString(), '4', 'A'];
            localStorage.setItem('grade', JSON.stringify(this.data));
            this.setState((state) => ({ data: this.data, view: "table" }));
        }
    }
    compute() {
        let noValue = 0;
        first:
        for (var i = 0; i < this.data[1].length; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.data[0][i][j].trim().length === 0) {
                    noValue++;
                    break first;
                }
            }
        }
        if (noValue > 0) {
            alert("The table is not completely filled");
        } else {
            var multiply = 0, units = 0, point = 0;
            var grades = ["F", "E", "D", "C", "B", "A"];
            for (var i = 0; i < this.data[1]; i++) {
                multiply += grades.indexOf(this.data[0][i][2]) * parseInt(this.data[0][i][1]);
                units += parseInt(this.data[0][i][1]);
            }
            this.gradePoint = (multiply / units).toFixed(2);
            localStorage.setItem("grade", JSON.stringify(this.data));
            this.setState((state) => ({ data: this.data, view: "result" }));
        }
    }
    reset() {
        this.data = [[], null];
        localStorage.removeItem("grade");
        this.setState((state) => ({ data: this.data, view: "courses" }));
    }
    goBack() {
        if (typeof (this.refs.res) !== 'undefined') {
            this.setState((state) => ({ data: this.data, view: "table" }));
            return null;
        }
        return "menu";
    }
    render() {
        if (this.state.view === "courses") {
            //Register number of courses
            return (
                <React.Fragment>
                    <div className="center">
                        <div className="margin_top">
                            <input className="textinput" type="text" maxLength="2" id="courses" ref="courses" placeHolder="Number of courses" /><br />
                            <input className="button" type="button" value="Submit" onClick={this.storeCourses} />
                        </div>
                    </div>
                </React.Fragment>
            );

        } else if (this.state.view === "table") {
            //Show table
            return (
                <React.Fragment>
                    <div id="table">
                        {(() => {
                            let table = [<div className="heading"><div className="th2">Courses</div><div className="th2">Units</div><div className="th2">Grade</div></div>];
                            for (var i = 0; i < this.data[1]; i++) {
                                table[i] = (
                                    <div className="row">
                                        <input type="text" maxLength="10" data-cell={i.toString() + "0"} className="column1" value={this.data[0][i][0]} onChange={this.handleChange} />
                                        <input type="text" maxLength="10" data-cell={i.toString() + "1"} className="column2" value={this.data[0][i][1]} onChange={this.handleChange} />
                                        <input type="text" maxLength="10" data-cell={i.toString() + "2"} className="column3" value={this.data[0][i][2]} onChange={this.handleChange} />
                                    </div>
                                );
                            }
                            return table;
                        })()}
                    </div>
                    <div className="buttpack">
                        <input type="button" className="button topbutt" value="Calculate" onClick={this.compute} /><br />
                        <input type="button" className="button" value="Edit" onClick={this.reset} />
                    </div>
                </React.Fragment>
            );

        } else {
            //Show computation result
            return (
                <React.Fragment>
                    <div className="showgp" ref="res">{this.gradePoint}</div>
                </React.Fragment>
            );
        }
    }
}