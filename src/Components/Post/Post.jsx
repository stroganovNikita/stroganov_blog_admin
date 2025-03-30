import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import checkTokenFetch from "../javascript/checkTokenFetch";
import classes from "./post.module.css";
import Nav from "../partials/Nav/Nav";
import { fetchPosts } from "../javascript/posts";
import Icon from "@mdi/react";
import {
  mdiArrowLeftCircle,
  mdiAccount,
  mdiCalendarClock,
  mdiLoading,
} from "@mdi/js";

function Post() {
  const [posts, setPosts] = useState(null);
  const [checkToken, setCheckToken] = useState(0);
  const [response, setResponse] = useState(0);
  const navigate = useNavigate();
  const post = useParams();
  const currentPost = posts && posts.posts.filter((pos) => pos.id == post.postId);

  useEffect(() => {
    const promisePosts = fetchPosts();
    promisePosts
      .then((promise) => promise.json())
      .then((promise) => setPosts(promise));
  }, []);

  useEffect(() => {
    let checkFn = checkTokenFetch();
    checkFn.then((answer) => setCheckToken(answer));
  }, []);

  const deletePost = (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    fetch(`http://localhost:3000/posts/${post.postId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        authorization: "Bearer " + token,
      },
    }).then((response) => navigate("/"));
  };

  const updatePost = (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    const body = event.currentTarget.elements;
    fetch(`http://localhost:3000/posts/${post.postId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: body.title.value,
        image: body.image.value,
        text: body.text.value,
        published: body.published.checked
      }),
    })
    .then((response) => response.json())
    .then((response) => setResponse(response))
  };
  if (checkToken.errors) {
    return (
      <>
        <Nav />
        <h2 className={classes.onlyForAdminWarning}>Only for admins</h2>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className={classes.mainPost}>
        {!posts && (
          <Icon path={mdiLoading} size={5} className={classes.loading} />
        )}
        {currentPost && (
          <>
            <form className={classes.formPostUpdate} onSubmit={updatePost}>
              <label htmlFor="image">Image link: </label>
              <input
                type="text"
                id="image"
                name="image"
                defaultValue={currentPost[0].image}
              />
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                id="title"
                name='title'
                defaultValue={currentPost[0].title}
              />
              <label htmlFor="published">Published:</label>
              <input type='checkbox' name='published' id='published' defaultChecked={currentPost[0].published}/>
              <label htmlFor="text">Text: </label>
              <textarea
                id="text"
                name="text"
                defaultValue={currentPost[0].text}
              ></textarea>
              <button type="submit">Update</button>
            </form>
            <form className={classes.formPostDelete} onSubmit={deletePost}>
              <button type="submit">Delete post</button>
            </form>
          </>
        )}
        <hr />
        {currentPost &&
          currentPost[0].comments.map((comment, index) => (
            <Comment comment={comment} index={index} key={index} />
          ))}
        ;
        <Link to="/" viewTransition>
          <Icon
            path={mdiArrowLeftCircle}
            size={4}
            className={classes.arrowBack}
          />
        </Link>
      </main>
    </>
  );
}

function Comment({ comment, index }) {
  return (
    <div key={index} className={classes.commentDiv}>
      <div className={classes.infoAboutUserComment}>
        <div>
          <Icon path={mdiAccount} size={1.3} />
          <p>{comment.authorname}</p>
        </div>
        <div>
          <Icon path={mdiCalendarClock} size={1.3} />
          <p>{new Date(comment.date).toLocaleString()}</p>
        </div>
      </div>
      <p>{comment.text}</p>
    </div>
  );
}

export default Post;
