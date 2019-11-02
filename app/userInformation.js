'use strict';

class userInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            birthday: null,
            gender: "Male"
        };
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log(this.state);

        this.props.setUserId("1");
    }

    render() {
        return (
            <div className="card border-secondary">
                <div className="card-body">
                    <h5 className="card-title">Basic Information</h5>
                    <h6 className="card-subtitle mb-2 text-muted">some text....</h6>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="birthday">Birthday</label>
                            <input required type="date" className="form-control" id="birthday" onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Genger</label>
                            <select required className="form-control" defaultValue={"Male"} id="gender" onChange={this.onChange}>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>

                        <button className="btn btn-primary btn-block">Save</button>
                    </form>

                </div>
            </div>
        )
    }
}

export default userInformation
