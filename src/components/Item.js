import React from 'react';

export default function Item(props) {
    let handleClick = () => {
        props.back("menu");
    }
    return (
        <React.Fragment>
            <div id="title"><div onClick={handleClick}>&#x2770;</div>{props.title}</div>
            <div id="body">{props.body}</div>
        </React.Fragment>
    );
}