const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElment = document.getElementById('comments');
const commentsFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

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

function saveComment(event) {
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const eneteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: eneteredText };

  // console.log(enteredTitle, eneteredText);

  fetch(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPosts);
commentsFormElement.addEventListener('submit', saveComment);
