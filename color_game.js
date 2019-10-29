'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            size: 5,
            showDiff: false,
            color: "",
            diffColor: "",
            diffLocation: [],
            started: false,
            startTime: null,
            time: null
        };
    }

    componentDidMount() {
        this.reloadColorGame();
    }

    reloadColorGame() {
        let color = this.getRandomColor();
        let diffColor;
        do {
            diffColor = this.getSimularColor(color, 1);
        } while (diffColor === color)

        console.log(diffColor);

        let diffLocation = [Math.floor(Math.random() * this.state.size), Math.floor(Math.random() * this.state.size)];

        this.setState({
            ...this.state,
            diffLocation: diffLocation,
            diffColor: diffColor,
            color: color,
            showDiff: false
        })

        this.startTimer();
    }

    startTimer() {
        this.setState({
            startTime: Date.now()
        });

        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.startTime
        }), 1);
    }

    stopTimer() {
        clearInterval(this.timer)
    }

    getRandomColor() {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            let colorNum = Math.floor(Math.random() * 16);
            color += colorNum.toString(16);
        }
        return color;
    }

    getSimularColor(original, diff) {
        let color = "#";

        let changeLoc = Math.floor(Math.random() * 2);

        for (let i = 0; i < 3; i++) {
            let colorNum = parseInt(original.substr(2 * i + 1, 2), 16);
            if (i == changeLoc) {
                colorNum += diff;
                colorNum %= 16;
            }
            let colorStr = colorNum.toString(16);
            color += colorStr.length < 2 ? "0" + colorStr : colorStr;
        }

        return color;
    }

    clickBlock(correct) {
        if (correct) {
            this.reloadColorGame();
            this.stopTimer();
        } else {
            alert("no");
        }
    }

    render() {
        let rows = [];

        let { diffLocation, color, diffColor, started, time } = this.state;

        for (let i = 0; i < this.state.size; i++) {
            let row = [];
            for (let j = 0; j < this.state.size; j++) {
                let isDiff = i == diffLocation[0] && j == diffLocation[1];
                row.push(
                    <div className="col text-center" key={j} style={{
                        backgroundColor: isDiff ? diffColor : color
                    }} onClick={() => { this.clickBlock(isDiff) }}>
                        {(this.state.showDiff || true) && isDiff ? <span className="badge badge-pill badge-primary">
                            Here
                        </span> : null}
                    </div >
                );
            }
            rows.push(
                <div className="row" key={i} style={{ height: "3rem" }}>{row}</div>
            )
        }

        return (
            <div>
                <div className="mb-3">
                    <button className="btn btn-success" onClick={() => {
                        this.setState({
                            ...this.state,
                            showDiff: true
                        })
                    }}>Show different</button>

                    <button className="btn btn-success ml-1" onClick={() => this.reloadColorGame()}>Next</button>
                </div>

                <div className="mb-3 text-center">
                    {started ? <span className="badge badge-warning">{time}</span> : <span className="badge badge-success">Waiting to start</span>}
                </div>

                {started ? <div className="mx-1">{rows}</div> : <button className="btn btn-block btn-primary" onClick={() => { this.setState({ ...this.state, started: true }) }}>Start</button>}
            </div >
        );
    }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);