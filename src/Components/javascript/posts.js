async function fetchPosts() {
  try {
    const posts = await fetch("http://localhost:3000/posts", {
      method: "GET",
      mode: "cors",
    });

    return posts;
  } catch {
    return { errors: [{ msg: "Error during fetch" }] };
  }
}

export { fetchPosts };
