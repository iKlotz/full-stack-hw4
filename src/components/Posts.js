import React from 'react';
import Post from '../components/Post';
import axios from "axios";

class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/posts').then(res => {
            this.setState({
                posts: res.data,
            });
        })
    }


    render() {
        return this.state.posts.map(function (post) {
            return <Post
                title={post.title}
                content={post.content}
                image={post.image}
                published={post.published}
                author={post.author}
                id={post.id}
            />
        })
    }
}

export default Posts;