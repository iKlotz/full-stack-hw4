import React from "react";

function AddPost () {
    return (
        <div className="post-form">
            <h1>Create new post</h1>
            <p>
                <form>
                    <input type="text" placeholder=" Post title goes here..." ></input>
                    <br/><br/>
                    <textarea rows="8" cols="50" placeholder="Post content goes here..."></textarea>
                    <br/><br/>
                    <button className="button" type="submit">Save post</button>
                </form>
            </p>
        </div>
    )
}

export default AddPost;