const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElment = document.getElementById('comments');

function createCommentList(comments) {
  const commentListElement = document.createElement('ol');

  for (comment of comments) {
    const commentElement = document.createElement('li');
    commentElement.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
    `;

    commentListElement.appendChild(commentElement);
  }
  return commentListElement;
}

async function fetchCommentsForPosts() {
  const postId = loadCommentsBtnElement.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
  // console.log(responseData);

  const commentsListElement = createCommentList(responseData);
  commentsSectionElment.innerHTML = '';
  commentsSectionElment.appendChild(commentsListElement);
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPosts);
