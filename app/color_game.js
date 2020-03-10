'use strict';

class ColorGame extends React.Component {
    constructor(props) {

        if (props.keyDiff) {
            localStorage.setItem('gameStartTime', '');
        }

        super(props);
        this.state = {
            gameId: _uuid(),
            color: "",
            diffColor: "",
            diffLocation: [],
            showDiff: false,
            startTime: null,
            time: null,
            started: false,
            wrongAns: null,
            gameCycle: 0,
            saved: false,
            recs: [],
            avgSpeed: parseInt(localStorage.getItem("avgSpeed")),
        };
    }

    componentDidMount() {
        this.setState({
            recs: localStorage.getItem("records") ? JSON.parse(localStorage.getItem("records")) : []
        })
        this.reloadColorGame();
    }

    reloadColorGame() {
        this.stopTimer();

        let color = this.getRandomColor();
        let diffColor;
        do {
            diffColor = this.getSimularColor(color, this.props.diffRange);
        } while (diffColor === color)

        let diffLocation = [Math.floor(Math.random() * (this.props.size - 1)), Math.floor(Math.random() * (this.props.size - 1))];

        this.setState({
            diffLocation: diffLocation,
            diffColor: diffColor,
            color: color,
            showDiff: false,
            wrongAns: null,
            gameCycle: this.state.gameCycle + 1,
            saved: false
        });
    }

    startGame() {
        this.reloadColorGame();

        this.props.startCallback();

        this.setState({
            started: true
        });

        this.startTimer();

        if (!localStorage.getItem("gameStartTime")) {
            localStorage.setItem("gameStartTime", new Date().toISOString());
        }
    }

    startTimer() {
        this.setState({
            startTime: Date.now()
        });

        this.timer = setInterval(() => {
            const timeLimit = this.props.timeLimit;
            let time = Date.now() - this.state.startTime;

            if (timeLimit > 0) {
                time = timeLimit - time;
            }

            if (time < 0) {
                this.showDiff();
                this.clickBlock(true);
            }

            this.setState({
                time
            });
        }, 1);
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
                colorNum += Math.random() > 0.5 ? diff : -diff;
                if (colorNum > 255) {
                    colorNum -= diff * 2;
                } else if (colorNum < 0) {
                    colorNum += diff * 2;
                }
            }
            let colorStr = colorNum.toString(16);
            color += colorStr.length < 2 ? "0" + colorStr : colorStr;
        }

        return color;
    }

    showDiff = () => {
        this.setState({
            showDiff: true
        });
        this.stopTimer();
    }

    clickBlock(correct) {

        const setState = this.setState.bind(this);

        if (correct) {
            this.saveResult();
            if (this.getPassedTime() < this.props.totalTime) {
                this.reloadColorGame();
                this.startTimer();
            }
        } else {
            clearTimeout(this.wrongAnsTimer);

            setState({
                wrongAns: true
            });

            this.wrongAnsTimer = setTimeout(() => {
                setState({
                    wrongAns: false
                });
            }, 2000);
        }
    }

    calculateResult(allData) {
        let timeSum = 0;
        let played = allData.length;
        let successCount = 0;
        let max = null;
        let min = null;
        allData.forEach((data) => {
            if (data.time > 100) {
                if (min === null || (this.props.timeLimit - data.time) < min) min = (this.props.timeLimit - data.time);
                if (max === null || (this.props.timeLimit - data.time) > max) max = (this.props.timeLimit - data.time);

                timeSum += this.props.timeLimit - data.time;
                successCount++;
            }
        });

        return {
            successCount,
            timeSum,
            played,
            averageTime: timeSum / successCount,
            rate: successCount / played,
            min,
            max
        }
    }

    saveResult = () => {
        if (!this.state.saved) {
            const { color, diffColor, gameId, time, diffLocation } = this.state;
            let data = {
                userId: this.props.userId,
                gameId,
                color,
                diffColor,
                time,
                diffLocation,
                host: window.location.host,
                updateKey: this.props.updateKey,
                gameTakenTime: new Date().toISOString()
            }

            this.setState({
                saved: true,
                recs: [...this.state.recs, data]
            });

            localStorage.setItem("records", JSON.stringify(this.state.recs));

            console.log(data);

            if (!this.props.debug) {
                firebase.firestore().collection("records").add(data)
                    .then((docRef) => {
                        console.log("Successfully saved on REF ", docRef.id);
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    getPassedTime() {
        let gameStartTime = localStorage.getItem("gameStartTime");
        return gameStartTime ? new Date() - new Date(gameStartTime) : 0;
    }

    render() {
        let rows = [];

        let { diffLocation, color, diffColor, started, time, wrongAns, saved } = this.state;

        let passedTime = this.getPassedTime();

        for (let i = 0; i < this.props.size; i++) {
            let row = [];
            for (let j = 0; j < this.props.size; j++) {
                let isDiff = i == diffLocation[0] && j == diffLocation[1];
                row.push(
                    <div className="col text-center p-1 " key={j} onClick={() => { this.clickBlock(isDiff) }}>
                        <div className="rounded mx-auto h-100" style={{
                            backgroundColor: isDiff ? diffColor : color,
                            opacity: (this.state.showDiff) && !isDiff ? "0.3" : "1"
                        }}></div>
                    </div >
                );
            }
            rows.push(
                <div className="row" key={i} style={{ height: "100px" }}>{row}</div>
            )
        }

        let resultData = {};
        if (!(passedTime < this.props.totalTime || (!saved && started))) {
            resultData = this.calculateResult(this.state.recs);
        }

        return (
            <div>
                <div className={this.props.debug ? "mb-1" : "d-none"}>
                    <button className="btn btn-success" onClick={this.showDiff}>Show different</button>
                    <button className="btn btn-success ml-1" onClick={() => this.reloadColorGame()}>Next</button>
                    <button className="btn btn-success ml-1" onClick={() => this.saveResult()}>Save result</button>
                </div>


                <div className="mb-3 text-center">
                    <h4 className={"fade " + (!!wrongAns ? "show" : "")}><span className={"badge badge-danger"} >不是這個唷</span></h4>
                    <h5>{passedTime < this.props.totalTime ? (started ? (time > 0 ? <span className="badge badge-primary">{Math.floor(time / 1000)}.{Math.floor(time % 1000)} sec</span> : <span className="badge badge-danger">時間到</span>) : <span className="badge badge-success">遊戲準備開始</span>) : <span className="badge badge-warning">遊戲結束</span>}</h5>
                </div>

                <div className={!started && passedTime < this.props.totalTime ? "text-center" : "d-none"}>
                    <button className="btn btn-primary btn-lg" onClick={() => { this.startGame(); }}>開始</button>
                </div>


                <div className="text-center">
                    {passedTime < this.props.totalTime || (!saved && started) ? (started ? <div className="mx-1">{rows}</div> : null) : <div>
                        <h4>感謝遊玩~~~</h4>
                        <div className="mt-4">
                            你的平均反應速度：<span className="badge badge-primary">{resultData.averageTime ? Math.floor(resultData.averageTime * 100) / 100 : "N/A"} 毫秒</span>
                            <br />
                            <br />
                            你總共做了 <span className="badge badge-primary">{resultData.played}</span> 題
                                    <br />
                            你花費了最長 <span className="badge badge-primary">{resultData.max / 1000}</span> 秒解一題
                                    <br />
                            你最快只花了 <span className="badge badge-primary">{resultData.min / 1000}</span> 秒解一題
                            <span className="d-none">正確率：<span className="badge badge-primary">{resultData.rate ? Math.floor(resultData.rate * 100) + "%" : "N/A"}</span></span>
                        </div>
                        {
                            this.props.canPlayMultiTime ?
                                <button className="btn btn-secondary mt-2" onClick={() => {
                                    localStorage.setItem("gameStartTime", "");
                                    location.reload();
                                }}>再玩一次</button>
                                : null
                        }

                    </div>}
                </div>
            </div>
        );
    }
}

export default ColorGame;