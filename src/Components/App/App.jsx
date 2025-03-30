import { useState, useEffect, useRef } from "react";
import Icon from "@mdi/react";
import { mdiCommentMultiple, mdiCalendarClock, mdiLoading } from "@mdi/js";
import { fetchPosts } from "../javascript/posts.js";
import { Link } from "react-router-dom";
import checkTokenFetch from "../javascript/checkTokenFetch";
import Nav from "../partials/Nav/Nav";
import classes from "./app.module.css";

function App() {
  const [checkToken, setCheckToken] = useState(0);
  const [posts, setPosts] = useState(0);
  const [response, setResponse] = useState(0);

  useEffect(() => {
    try {
      const promisePosts = fetchPosts();
      promisePosts
        .then((promise) => promise.json())
        .then((promise) => setPosts(promise));
    } catch {
      console.log("failed fetch");
    }
  }, [response]);

  useEffect(() => {
    let checkFn = checkTokenFetch();
    checkFn.then((answer) => setCheckToken(answer));
  }, []);

  const handleSubmit = (event) => {
    const body = event.currentTarget.elements;
    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append('file', body.file.files[0]);
    form.append('title', body.title.value);
    form.append('text', body.text.value);
    event.preventDefault();
    fetch("http://localhost:3000/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        authorization: "Bearer " + token,
      },
      body: form
    })
      .then((response) => response.json())
      .then((response) => setResponse(response));
  };

  return (
    <>
      <Nav />
      <main>
        {!checkToken.data && (
          <h2 className={classes.msgOnlyForAdmin}>Only for admin</h2>
        )}
        {checkToken.data && (
          <>
            <div className={classes.newPostDiv}>
              <h2 className={classes.newPostHeader}>Create new post:</h2>
              <form className={classes.formNewPost} method="POST" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="file">Picture: </label>
                  <input type="file" id="file" name="file" required/>
                  <label htmlFor="title">Title:</label>
                  <input type="text" id="title" name="title" required />
                </div>
                <label htmlFor="text">Text:</label>
                <textarea id="text" name="text" required></textarea>
                <button type="submit">Create</button>
              </form>
              {response.data && <p className={classes.responseSuccess}>{response.data}</p>}
            </div>
            <h2 className={classes.allPostHeader}>Update posts:</h2>
            <div className={classes.postsDiv}>
              {posts &&
                posts.posts.map((post, index) => {
                  return (
                    <Link to={`/posts/${post.id}`} key={index} viewTransition>
                      <div key={index} className={classes.postDiv}>
                        <img src={post.image} />
                          <h3>{post.title}</h3>
                          <div className={classes.infoAboufPost}>
                            <div className={classes.postTimeDiv}>
                              <Icon path={mdiCalendarClock} size={1} />
                              <p>{new Date(post.date).toLocaleDateString()}</p>
                            </div>
                            <div className={classes.postMessageDiv}>
                              <Icon path={mdiCommentMultiple} size={1} />
                              <p>{post.comments.length}</p>
                            </div>
                          </div>
                        <p className={classes.postText}>
                          {post.text}
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default App;
