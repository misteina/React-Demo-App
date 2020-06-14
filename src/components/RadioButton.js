function RadioButton(props) {
    let radioSelect = (e) => {
        props.change(e);
    }
    return (
        <div className="option">
            <input type="radio" id={props.id} name="ask" value={props.value} onChange={radioSelect} />
            <label for={props.id}>{props.question}</label>
            <div className="check"><div className="inside"></div></div>
        </div>
    );
}