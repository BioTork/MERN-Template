//code borrowed and tweaked from Bryant Wilkins: https://github.com/Bryant1-Dev/CEN3031-presentation

import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import './Login.css';

//login component
class Login extends Component {
    constructor(props) {
        //Necessary for class components
        super(props);
        console.log(props);

        //binding functions
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //Setting the default state
        this.state = {
            username: "",
            password: "",
            redirectTo: "/admin",
            loginError: "",
            isLoading: false
        };
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        this.setState({ isLoading: true });
        //This allows us to exchange the default behavior for our custom behavior
        event.preventDefault();
        const { username, password } = this.state;
        const user = {
            username,
            password
        };

        //call login function with login route
        this.props.login("/api/users/login", user, data => {

            //if login successful redirect to admin page
            if (data.success) {
                this.setState({
                    username: "",
                    password: "",
                    isLoading: false
                });

                console.log(`Successfully logged in!`);
                this.props.history.push("/admin");
            }
            //if login unsuccessful return to users/login page
            else {
                this.setState({
                    username: "",
                    password: "",
                    isLoading: false,
                    loginError: "Login failed"
                });
                this.props.history.push("/users/login");
            }
        });
    }
    
    render() {
        //if logged in, redirect to redirect page, which should be admin page
        if (this.props.loggedIn)
            return <Redirect to={{ pathname: this.state.redirectTo }} />;
        //if loading, show loading page
        if (this.state.isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        return (
            <div className="login-view-container">
                <div className="login-container">
                    <div className="login-input-container">
                        <h3>Login User</h3>
                        <br />
                    </div>
                    {this.state.loginError ? <p>{this.state.loginError}</p> : null}
                    <form
                        onSubmit={e => this.onSubmit(e)}
                        className="login-form-container"
                    >
                        <div className="login-input-container">
                            <label htmlFor="username"></label>
                            <input
                                type="username"
                                name="username"
                                placeholder="Enter Username"
                                required
                                className="login-input"
                                value={this.state.username}
                                onChange={e => this.onChange(e)}
                            />
                        </div>
                        <div className="login-input-container">
                            <label htmlFor="password"></label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                required
                                className="login-input"
                                value={this.state.password}
                                onChange={e => this.onChange(e)}
                            />
                        </div>
                        <div className="login-input-container">
                            <input type="submit" value="Login" className="login-button" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
