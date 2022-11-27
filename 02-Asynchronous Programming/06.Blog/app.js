async function attachEvents() {
    const loadPostsBtn = document.getElementById('btnLoadPosts');
    const postsSelect = document.getElementById('posts');
    let posts = {};

    loadPostsBtn.addEventListener('click', async () => {
        postsSelect.innerHTML = '';

        const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
        posts = await response.json();

        // console.log(posts);

        Object.keys(posts).forEach(post => {
            const option = document.createElement('option');
            option.textContent = posts[post].title;
            option.value = posts[post].id;

            postsSelect.appendChild(option);
        });
    });

    const viewPostsBtn = document.getElementById('btnViewPost');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const ulPostComments = document.getElementById('post-comments');

    const commentsResponse = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
    const comments = await commentsResponse.json();

    const commentsArray = Object.entries(comments);


    viewPostsBtn.addEventListener('click', async (e) => {
        // console.log(postsSelect.value);
        let postsArray = Object.entries(posts);


        const currentPostId = postsSelect.value;

        // const currentPost = posts.find(post => post.id === currentPostId);
        // console.log(currentPost);

        const currentPost = postsArray.find(post => post[0] === currentPostId);
        // console.log(currentPost);
        postTitle.textContent = currentPost[1].title;
        postBody.textContent = currentPost[1].body;

        // console.log(Object.entries(posts));
        // console.log(postsArray);

        let currentComments = commentsArray.filter(comment => comment[1].postId === currentPostId);

        // console.log(currentComments);

        ulPostComments.innerHTML = '';

        currentComments.forEach(comment => {
            const li = document.createElement('li');
            li.textContent = comment[1].text;

            ulPostComments.appendChild(li);
        });
    });

}

attachEvents();