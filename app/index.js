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
            totalTime: config.totalTime,
            initialized: false,
            keyDiff: false
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

    componentDidMount() {
        remoteConfig.ensureInitialized()
            .then(() => remoteConfig.fetchAndActivate())
            .then(() => {
                console.log('Firebase Remote Config is initialized');
                console.log(remoteConfig.getAll());

                let newState = {
                    ...this.state,
                    initialized: true,
                };

                if (remoteConfig.lastFetchStatus === 'success') {
                    let keyDiff = remoteConfig.getString('updateKey') !== localStorage.getItem('updateKey');
                    localStorage.setItem('updateKey', remoteConfig.getString('updateKey'));

                    newState = {
                        ...newState,
                        timeLimit: remoteConfig.getNumber('time_limit'),
                        diffRange: remoteConfig.getNumber('different_range'),
                        totalTime: remoteConfig.getNumber('total_time'),
                        keyDiff
                    }
                }

                this.setState(newState);
            })
            .catch((err) => {
                console.error('Firebase Remote Config failed to initialize', err);
            });
    }

    render() {
        const { gameStarted, user, diffRange, timeLimit, size, loaded, totalTime, keyDiff } = this.state;

        return (
            <div className="container mt-5">
                <div className={gameStarted ? "d-none d-md-block" : ""}>
                    <h2>找出圖中顏色與其他不同的格子</h2>
                    {!gameStarted ?
                        <p>
                            這個測驗只需要花你一分鐘就結束，你的每一份回答都是我們重要的依據，謝謝(⁎⁍̴̛ᴗ⁍̴̛⁎)
                        </p>
                        : null}
                </div>
                {loaded ?
                    user ? <ColorGame timeLimit={timeLimit} size={size} diffRange={diffRange} totalTime={totalTime} debug={debug ? debug : false} userId={user.uid} startCallback={() => { this.setState({ gameStarted: true }) }} keyDiff={keyDiff} /> : <UserInformation />
                    : null}
            </div>
        );
    }
}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(e(MainSector), domContainer);