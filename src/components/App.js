import React from 'react';
import Item from './Item';
import Menu from './Menu';
import LectureTable from './LectureTable';
import ExamTable from './ExamTable';
import Forecast from './Forecast';
import ComputeGradePoint from './ComputeGradePoint';


export default class App extends React.Component {
    constructor() {
        super();
        this.state = { view: "menu" };
        this.gpRef = React.createRef();
    }
    handleClick = param => {
        if (typeof this.gpRef.current !== 'undefined') {
            if (this.gpRef.current.goBack() === "menu") this.setState(state => ({ view: param }));
        } else {
            this.setState(state => ({ view: param }));
        }
    }
    render() {
        switch (this.state.view) {
            case "menu":
                return <Menu choose={this.handleClick} />;
            case "lecture":
                return <Item back={this.handleClick} title="Lecture Time Table" body={<LectureTable />} />;
            case "forecast":
                return <Item back={this.handleClick} title="Forecast" body={<Forecast />} />;
            case "gp":
                return <Item back={this.handleClick} title="Compute Grade Point" body={<ComputeGradePoint ref={this.gpRef} />} />;
            case "exam":
                return <Item back={this.handleClick} title="Exam Time Table" body={<ExamTable />} />;
        }
    }
}