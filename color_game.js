'use strict';

const e = React.createElement;

class ColorGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 5,
            color: "",
            diffColor: "",
            diffLocation: [],
            showDiff: false,
            startTime: null,
            time: null,
            started: false,
            wrongAns: null
        };
    }

    componentDidMount() {
        this.reloadColorGame();
    }

    reloadColorGame() {
        this.stopTimer();

        let color = this.getRandomColor();
        let diffColor;
        do {
            diffColor = this.getSimularColor(color, 1);
        } while (diffColor === color)

        let diffLocation = [Math.floor(Math.random() * (this.state.size - 1)), Math.floor(Math.random() * (this.state.size - 1))];

        this.setState({
            ...this.state,
            diffLocation: diffLocation,
            diffColor: diffColor,
            color: color,
            showDiff: false,
            wrongAns: null,
            started: false
        });
    }

    startGame() {
        this.reloadColorGame();

        this.setState({
            ...this.state,
            started: true
        });

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
        let state = this.state;

        if (correct) {
            this.reloadColorGame();
            state = this.state;
            this.stopTimer();
            state.wrongAns = false;
            state.started = false;
        } else {
            state.wrongAns = true;
        }

        this.setState(state);
    }

    render() {
        let rows = [];

        let { diffLocation, color, diffColor, started, time, wrongAns } = this.state;

        for (let i = 0; i < this.state.size; i++) {
            let row = [];
            for (let j = 0; j < this.state.size; j++) {
                let isDiff = i == diffLocation[0] && j == diffLocation[1];
                row.push(
                    <div className={"col text-center p-1 " + ((this.state.showDiff) && isDiff ? "bg-info border border-dark" : "")} key={j} onClick={() => { this.clickBlock(isDiff) }}>
                        <div className="rounded mx-auto h-100" style={{
                            backgroundColor: isDiff ? diffColor : color
                        }}></div>
                    </div >
                );
            }
            rows.push(
                <div className="row" key={i} style={{ height: "100px" }}>{row}</div>
            )
        }

        return (
            <div>
                <div className="mb-1">
                    <button className="btn btn-success" onClick={() => {
                        this.setState({
                            ...this.state,
                            showDiff: true
                        });
                        this.stopTimer();
                    }}>Show different</button>

                    <button className="btn btn-success ml-1" onClick={() => this.reloadColorGame()}>Next</button>
                </div>


                <div className="mb-3 text-center">
                    <h4 className={"fade " + (!!wrongAns ? "show" : "")}><span className={"badge badge-danger"} > Wrong Answer</span></h4>
                    {started ? <span className="badge badge-primary">{Math.floor(time / 1000)}.{time % 1000} sec</span> : <span className="badge badge-success">Waiting to start</span>}
                </div>

                <div className={!started ? "text-center" : "d-none"}>
                    <button className="btn btn-primary btn-lg" onClick={() => { this.startGame(); }}>Start</button>
                </div>

                <div className="text-center">
                    {started ? <div className="mx-1">{rows}</div> : null}
                </div>
            </div >
        );
    }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(ColorGame), domContainer);