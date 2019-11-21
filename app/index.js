'use strict';

import ColorGame from './color_game';
import UserInformation from './userInformation';
const e = React.createElement;

const config = require('./config.json');

class MainSector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false,
            user: firebase.auth().currentUser,
            loaded: true,
            diffRange: config.diffRange,
            size: config.size,
            timeLimit: config.timeLimit
        };

        const setState = this.setState.bind(this);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var uid = user.uid;
                console.log("UID", uid);
                setState({
                    user: user
                });
            }
        });
    }

    render() {
        const { gameStarted, user, diffRange, timeLimit, size, loaded } = this.state;

        return (
            <div className="container mt-5">
                <div className={gameStarted ? "d-none d-md-block" : ""}>
                    <h2>Find the different color</h2>
                    <p>This is the demo of the different color finding game.</p>
                </div>
                {loaded ?
                    user ? <ColorGame timeLimit={timeLimit} size={size} diffRange={diffRange} debug={debug ? debug : false} userId={user.uid} /> : <UserInformation />
                    : null}

                <LoginPanel />
            </div>
        );
    }
}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(e(MainSector), domContainer);