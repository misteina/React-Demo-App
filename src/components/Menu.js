export default function Menu(props) {
    const handleClick = e => {
        var button = e.target.dataset.button;
        props.choose(button);
    }
    return (
        <div className="menu">
            <input type="button" className="menubutt" data-button="lecture" value="Lecture Time Table" onClick={handleClick} />
            <input type="button" className="menubutt" data-button="forecast" value="Forecast Grade Point" onClick={handleClick} />
            <input type="button" className="menubutt" data-button="gp" value="Compute Grade Point" onClick={handleClick} />
            <input type="button" className="menubutt" data-button="exam" value="Exam Time Table" onClick={handleClick} />
        </div>
    );
}