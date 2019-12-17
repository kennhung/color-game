'use strict';

class userInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            birthday: null,
            gender: "Male",
            admin: false
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

        firebase.auth().signInAnonymously()
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode, errorMessage);
            }).then((userCred) => {
                firebase.firestore().collection("users").doc(userCred.user.uid).set({
                    ...this.state,
                    gender: this.state.gender === "Male" ? 1 : 2
                })
                    .then(function () {
                        console.log("User information saved!!");
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            });
    }

    render() {
        return (
            <div className="card border-secondary">
                <div className="card-body">
                    <h5 className="card-title">基本資料</h5>
                    <h6 className="card-subtitle mb-2 text-muted">填寫的資料只會用於統計，並不會用於其他用途</h6>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="birthday">生日</label>
                            <input required type="date" className="form-control" id="birthday" onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">生理性別</label>
                            <select required className="form-control" defaultValue={"Male"} id="gender" onChange={this.onChange}>
                                <option>男</option>
                                <option>女</option>
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
