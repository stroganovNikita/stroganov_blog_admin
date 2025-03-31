async function fetchPosts() {
  try {
    const posts = await fetch("https://celebrated-vision-production.up.railway.app/posts", {
      method: "GET",
      mode: "cors",
    });

    return posts;
  } catch {
    return { errors: [{ msg: "Error during fetch" }] };
  }
}

export { fetchPosts };
