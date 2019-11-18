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
            userId: null,
            loaded: true,
            diffRange: config.diffRange,
            size: config.size,
            timeLimit: config.timeLimit
        };
    }

    componentDidMount() {
        this.loadConfig();
    }

    loadConfig() {
        // firebase.firestore().collection("settings").doc("default").get().then((doc) => {
        //     const data = doc.data();
        //     this.setState({
        //         ...this.state,
        //         size: data.size,
        //         diffRange: data.diffRange,
        //         timeLimit: data.timeLimit,
        //         loaded: true
        //     })
        // }).catch((err) => console.log(err));
    }

    setUserId = (id) => {
        this.setState({
            ...this.state,
            userId: id
        })
    }

    render() {
        const { gameStarted, userId, diffRange, timeLimit, size, loaded } = this.state;

        return (
            <div className="container mt-5">
                <div className={gameStarted ? "d-none d-md-block" : ""}>
                    <h2>Find the different color</h2>
                    <p>This is the demo of the different color finding game.</p>
                </div>
                {loaded ?
                    userId ? <ColorGame timeLimit={timeLimit} size={size} diffRange={diffRange} debug={true} userId={userId} /> : <UserInformation setUserId={this.setUserId} />
                    : null}
            </div>
        );
    }
}

const domContainer = document.querySelector('#main_container');
ReactDOM.render(e(MainSector), domContainer);