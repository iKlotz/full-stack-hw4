import React from 'react';
import Header from "./components/Header"

import { BrowserRouter as Router, Redirect, Route, Switch, useParams } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactMe from "./pages/ContactMe";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import './App.css';
import axios from "axios";


class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            firstName: '',
            id: '',
            isLoggedIn: false
        }
    }

    setLogin = (data) => {
        this.setState({
            firstName: data.first_name,
            id: data.user_id,
            isLoggedIn: true
        })
    };

    onLogout = () => {
        const url = "/logout";
        const data = {
            user_id: this.state.id
        };

        axios.post(url, data)
            .then((res) => {
                this.setState({
                    firstName: '',
                    id: '',
                    isLoggedIn: false
                });
            })
            .catch((err) => {
                console.log("Error during logout")
            });
    };

    render() {
        return (
            <div>
                <Router>
                    <Header onLogout={this.onLogout}/>
                    <Switch>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={() => <Login setLogin={this.setLogin} />}/>
                        <Route path='/post/:id' component={Post}/>
                        <Route path="/about" component={About}/>
                        <Route path="/contact" component={ContactMe}/>
                        <Route path="/new-post" component={CreatePost}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
