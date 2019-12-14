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
            timeLimit: config.timeLimit,
            totalTime: config.totalTime
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
        const { gameStarted, user, diffRange, timeLimit, size, loaded, totalTime } = this.state;

        return (
            <div className="container mt-5">
                <div className={gameStarted ? "d-none d-md-block" : ""}>
                    <h2>找出圖中顏色與其他不同的格子</h2>
                    <p>說明......</p>
                </div>
                {loaded ?
                    user ? <ColorGame timeLimit={timeLimit} size={size} diffRange={diffRange} totalTime={totalTime} debug={debug ? debug : false} userId={user.uid} /> : <UserInformation />
                    : null}
            </div>
        );
    }
}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(e(MainSector), domContainer);