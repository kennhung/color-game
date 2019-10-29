'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            size: 10,
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
            diffColor = this.getSimularColor(color, 1, 1);
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
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getSimularColor(original, diff, hard) {
        let color = "#";

        for (let i = 0; i < 3; i++) {
            let colorInt = parseInt(original.substr(2 * i + 1, 2), 16);
            // console.log(colorInt);
            if (hard < i) {
                colorInt += diff;
                colorInt %= 16;
            }
            color += colorInt.toString(16).length < 2 ? "0" + colorInt.toString(16) : colorInt.toString(16);
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
                    <div className="col" key={j} style={{
                        backgroundColor: (i == diffLocation[0] && j == diffLocation[1] ? diffColor : color)
                    }}>
                        {this.state.showDiff && i == diffLocation[0] && j == diffLocation[1] ? <span>
                            Here
                        </span> : <br />}

                    </div >
                );
            }
            rows.push(
                <div className="row" key={i}>{row}</div>
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