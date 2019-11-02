'use strict';

import ColorGame from './color_game';
import UserInformation from './userInformation';
const e = React.createElement;

class MainSector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false,
            userId: null
        };
    }

    setUserId = (id) => {
        this.setState({
            ...this.state,
            userId: id
        })
    }

    render() {
        const { gameStarted, userId } = this.state;

        return (
            <div className="container mt-5">
                <div className={gameStarted ? "d-none d-md-block" : ""}>
                    <h2>Find the different color</h2>
                    <p>This is the demo of the different color finding game.</p>
                </div>

                {userId ? <ColorGame timeLimit={5000} size={5} diffRange={50} /> : <UserInformation setUserId={this.setUserId} />}
            </div>
        );
    }
}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(e(MainSector), domContainer);