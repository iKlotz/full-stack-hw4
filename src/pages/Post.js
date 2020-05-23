import React from "react";
import { posts } from "../components/Posts";
import { useParams } from 'react-router-dom';


function Post() {
    let { id } = useParams();
    return (
        <div>
            <h1>{posts[id - 1].title}</h1>
            <p>{posts[id - 1].content}</p>
        </div>
    );
}

export default Post;