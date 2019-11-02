'use strict';

import ColorGame from './color_game';
const e = React.createElement;

class MainSector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false
        };
    }



    render() {
        const { gameStarted } = this.state;

        return (
            <div className="container mt-5">
                <div className={gameStarted ? "d-none d-md-block" : ""}>
                    <h2>Find the different color</h2>
                    <p>This is the demo of the different color finding game.</p>
                </div>
                
                <ColorGame timeLimit={5000} size={5} diffRange={50} />
            </div>
        );
    }
}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(e(MainSector), domContainer);