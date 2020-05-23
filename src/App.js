import React from 'react';
import Header from "./components/Header"

import { BrowserRouter as Router, Redirect, Route, Switch, useParams } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactMe from "./pages/ContactMe";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";

import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route path='/post/:id' component = {Post}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={ContactMe}/>
                    <Route path="/new-post" component={CreatePost}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
