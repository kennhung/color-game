'use strict';

import ColorGame from './color_game';
const e = React.createElement;

class MainSector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="container mt-5">
                <h2>Find the different color</h2>
                <p>This is the demo of the different color finding game.</p>
                <ColorGame />
            </div>
        );
    }
}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(e(MainSector), domContainer);