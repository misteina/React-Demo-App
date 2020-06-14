import React from 'react';
import RadioButton from './RadioButton';

export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.option = null;
        this.answers = [];
        this.forecastData = [];
        this.state = { data: 0 };
        this.radioSelect = this.radioSelect.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.questions = [
            {
                question: "How often do you attend lectures?",
                options: ["I don't miss", "Most times", "Moderately", "Few times", "I don't attend"],
                values: [15, 12, 9, 6, 3]
            },
            {
                question: "How much did you pay attention during your recent lectures?",
                options: ["10% attention", "30% attention", "50% attention", "70% attention", "90% attention", "Full attention"],
                values: [3, 6, 9, 12, 15]
            },
            {
                question: "How often do you study?",
                options: ["Everyday", "6 times a week", "5 times a week", "4 times a week", "3 times a week", "1 -2 times a week"],
                values: [15, 13, 11, 9, 7, 5]
            },
            {
                question: "How many hours do you spend studying in a sitting?",
                options: ["About 1 hour", "About 2 hour", "About 3 hours", "About 4 hours", "About 5 hours", "Above 6 hours"],
                values: [6, 8, 10, 11, 13, 15]
            },
            {
                question: "How much do you think you gained the previous time you studied?",
                options: ["5% gain", "10% gain", "30% gain", "50% gain", "70% gain", "90% gain"],
                values: [5, 10, 15, 20, 25, 30]
            },
            {
                question: "How fast do you think you are covering your semester syllabus?",
                options: ["About 90% fast", "About 70% fast", "About 50% fast", "About 30% fast", "About 10% fast"],
                values: [50, 40, 30, 20, 10]
            }
        ];
    }
    radioSelect(e) {
        this.option = parseInt(e.target.value);
    }
    nextQuestion(e) {
        this.answers.push(this.option);
        var ele = document.getElementsByName("ask");
        for (var i = 0; i < ele.length; i++) ele[i].checked = false;
        if (this.state.data === 5) {
            var sum = this.answers.reduce((a, b) => a + b, 0);
            var points = JSON.parse(localStorage.getItem("points"));
            if (points !== null) {
                if (points.length === 2) points.shift();
            } else {
                points = [];
            }
            points.push(sum);

            let forecast;
            let previous;
            let improvement;
            if (points.length === 1) {
                forecast = (((points[0] / 150) * 5).toFixed(2)).toString();
                previous = '-';
                improvement = '-';
            } else if (points.length === 2) {
                forecast = (((points[1] / 150) * 5).toFixed(2)).toString();
                previous = (((points[0] / 150) * 5).toFixed(2)).toString();
                improvement = (forecast - previous).toFixed(2).toString();
            }
            if (points.length === 2) {
                if (improvement >= 0) {
                    improvement = '+' + improvement;
                    this.color = '#0c8c5f';
                } else {
                    this.color = '#f15454';
                }
            }
            this.forecastData = [forecast, previous, improvement];
            localStorage.setItem("points", JSON.stringify(points));
        }
        this.setState((state) => ({ data: state.data + 1 }));
    }
    render() {
        let display;
        let extra = null;
        let tick = this.state.data;
        let ask = this.questions;
        if (tick < 6) {
            if (ask[tick]["values"].length === 6) {
                extra = <RadioButton id="a-option" value={ask[tick]["values"][5]} change={this.radioSelect} question={ask[tick]["options"][5]} />;
            }
            display = (
                <React.Fragment>
                    <div className="ask"><div className="stage">{(tick + 1).toString()} of 6</div>{ask[tick]["question"]}</div><br />
                    <div className="container">
                        <RadioButton id="b-option" value={ask[tick]["values"][0]} change={this.radioSelect} question={ask[tick]["options"][0]} />
                        <RadioButton id="c-option" value={ask[tick]["values"][1]} change={this.radioSelect} question={ask[tick]["options"][1]} />
                        <RadioButton id="d-option" value={ask[tick]["values"][2]} change={this.radioSelect} question={ask[tick]["options"][2]} />
                        <RadioButton id="e-option" value={ask[tick]["values"][3]} change={this.radioSelect} question={ask[tick]["options"][3]} />
                        <RadioButton id="f-option" value={ask[tick]["values"][4]} change={this.radioSelect} question={ask[tick]["options"][4]} />
                        {extra}
                    </div>
                    <div className="basebutton"><input className="button" type="button" value="Next" onClick={this.nextQuestion} /></div>
                </React.Fragment>
            );
        } else {
            display = (
                <React.Fragment>
                    <div className="ftitle">Current Forecast</div>
                    <div className="fdig">{this.forecastData[0]}</div>
                    <div className="previ">
                        Previous:&nbsp;&nbsp;<span style={{ color: '#868686' }}>{this.forecastData[1]}</span><br />
                        Improvement:&nbsp;&nbsp;<span style={{ color: this.color }}>{this.forecastData[2]}</span>
                    </div>
                </React.Fragment>
            );
        }
        return display;
    }
}