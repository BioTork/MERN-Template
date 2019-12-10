import React from 'react';
import {Switch, Redirect  } from 'react-router-dom';
import { Router, Route } from "react-router-dom";
import axios from 'axios';

import history from "./history";


import Login from "./views/Login/Login"; 

import AuthenticatedComponent from "./components/AuthenticatedComponent/AuthenticatedComponent";

import Home from "./views/Home/Home"
import About from "./views/About/About"
import Contact from "./views/Contact/Contact"
import Projects from "./views/Projects/Projects"
import Technology from "./views/Technology/Technology"
import Press from "./views/Press/Press"
import Publications from "./views/Publications/Publications"
import Admin from "./views/Admin/Admin"
import NotFound from "./views/NotFound/NotFound"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        //user authentication function bindings
        this.login = this.login.bind(this);
        this.verify = this.verify.bind(this);
        this.logout = this.logout.bind(this);

        //state contains login status
        this.state = {
            loggedIn: false,
            user: {}
        };

        
    }

    //everytime mounting app, check user authentication
    componentDidMount() {
        this.verify("/api/users/verify", data => {
        });
    }


    

    //login function
    login(route, user, cb) {
        //in production a .catch(err => console.log(err)) should be implemented

        axios.post(route, user).then(response => {
            //set own state and execute the callback
            console.log("response", response);
            if (response.data.success) {
                this.setState({
                    loggedIn: true
                });
            }
            cb(response.data);
        }).catch((err) => {
            //if there is an error, executive callback with success status: false
            console.log(err);
            cb({succcess: false});
        });
    }

    //verify function to check authentication
    verify(route, cb) {
        axios.get(route).then(response => {

            //on success res.data has: success, message, user.name, user.username, user.email, user.logggedIn
            //if user is logged in set login state to true
            if (!response.data.success) {
                this.setState({
                    loggedIn: response.data.user.loggedIn
                });
            }
            //if user is not logged in set login state to false
            else {
                this.setState({
                    user: response.data.user,
                    loggedIn: response.data.user.loggedIn
                });
            }
            cb(response.data);
        }).catch((err) => {
            //if there is an error, executive callback with success status: false
            console.log(err);
            cb({ succcess: false });
        });
    }

    //logout function
    logout(route) {
        axios.post(route).then(response => {
            console.log(response.data);
            //if logout is successful, set login state to false
            if (response.data.success) {
                this.setState({
                    loggedIn: false,
                    user: {}
                });
                console.log("Logout was successful!");
                history.push("/users/login");
            }
            //if logout is not successful, print login failed
            else {
                console.log("Logout out failed - server error");
            }
        }).catch((err) => {
            //if there is an error, print error
            console.log(err);
        });
    }



    render() {


        console.log("logged in", this.state.loggedIn);
        return (
            <div>
                <Router history={history}>
                    <Header
                        logout={this.logout}
                        loggedIn={this.state.loggedIn}
                    />
                    <div className="content">
                        <Switch >
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                            <Route exact path="/about" component={About} />
                            <Route exact path="/technology" component={Technology} />
                            <Route exact path="/projects" component={Projects} />
                            <Route exact path="/contact" component={Contact} />
                            <Route exact path="/press" component={Press} />
                            <Route exact path="/publications" component={Publications} />
                            <Route
                                exact path="/users/login" 
                                render={() => (
                                    <Login login={this.login} loggedIn={this.state.loggedIn} />
                                )}
                            />

                            <AuthenticatedComponent verify={this.verify} loggedIn={this.state.loggedIn}>
                                <Switch >
                                    <Route
                                        exact path="/admin"
                                        component={Admin}
                                    />
                                    <Route component={NotFound} />
                                </Switch>
                            </AuthenticatedComponent>
                        </Switch>
                        <div className="bottom">
                            <Footer />
                        </div>
                    </div>
                </Router>
            </div>
            
        );
    }
}
export default App;