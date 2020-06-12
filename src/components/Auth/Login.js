import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setState({
            email: null,
            password: null,
            serverResponse: null
        });
    }

    onChange = e => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        const url = "http://localhost:5000/login";
        const data = {
            email,
            password
        };

        axios.post(url, data)
            .then((res) => {
                this.setState({
                    email: '',
                    password: ''
                });

                console.log("Great success!")

                //this.props.isLoggedIn()
                this.props.setLogin(res.data)

            })
            .catch((err) => {
                console.log("Error during login")
                this.setState({
                    serverResponse: "Error: failed to login."
                });
            });
    };

    render() {
        const {email, password} = this.state;

        return (
            <div className='form-container'>
                <h1>
                    Account Login
                </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div>
                        <input type="submit"
                               value="Login"
                               className="btn btn-secondary btn-block"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;