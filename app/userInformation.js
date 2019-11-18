'use strict';

import Cookies from 'js-cookie';

class userInformation extends React.Component {
    constructor(props) {
        super(props);

        let userId = Cookies.get('userId');

        if (userId != undefined) {
            props.setUserId(userId);
        }

        this.state = {
            birthday: null,
            gender: "Male"
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const setUserId = this.props.setUserId;

        firebase.firestore().collection("users").add(this.state)
            .then(function (docRef) {
                Cookies.set("userId", docRef.id);
                setUserId(docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <div className="card border-secondary">
                <div className="card-body">
                    <h5 className="card-title">Basic Information</h5>
                    <h6 className="card-subtitle mb-2 text-muted">some text....</h6>

                    <button className="btn btn-secondary mb-2" onClick={() => this.props.setUserId("skip")}>Skip</button>

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
