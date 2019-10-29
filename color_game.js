'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            size: 6,
            showDiff: false,
            color: "",
            diffColor: "",
            diffLocation: []
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

    render() {
        let rows = [];

        let diffLocation = this.state.diffLocation;
        let color = this.state.color;
        let diffColor = this.state.diffColor;

        for (let i = 0; i < this.state.size; i++) {
            let row = [];
            for (let j = 0; j < this.state.size; j++) {
                row.push(
                    <div className="col text-center ver" key={j} style={{
                        backgroundColor: (i == diffLocation[0] && j == diffLocation[1] ? diffColor : color)
                    }}>
                        {this.state.showDiff && i == diffLocation[0] && j == diffLocation[1] ? <span className="badge badge-pill badge-primary">
                            Here
                        </span> : <br />}
                        <br />
                    </div >
                );
            }
            rows.push(
                <div className="row row-eq-height" key={i}>{row}</div>
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

                {rows}
            </div >
        );
    }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);