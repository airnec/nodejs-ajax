const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');
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

  try {
    const response = await fetch(`/posts/${postId}/comments`);

    if (!response.ok) {
      alert('Fetching comments failed!');
      return;
    }

    const responseData = await response.json();
    // console.log(responseData);

    if (responseData && responseData.length > 0) {
      const commentsListElement = createCommentList(responseData);
      commentsSectionElement.innerHTML = '';
      commentsSectionElement.appendChild(commentsListElement);
    } else {
      commentsSectionElement.firstElementChild.textContent =
        'We could not find any comments! Maybe add one?';
    }
  } catch (error) {
    alert('Could not send the request - Maybe try again later!');
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const eneteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: eneteredText };

  // console.log(enteredTitle, eneteredText);

  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      fetchCommentsForPosts();
    } else {
      alert('Could not send comment!');
    }
  } catch (error) {
    alert('Could not send the request - Maybe try again later!');
  }
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPosts);
commentsFormElement.addEventListener('submit', saveComment);
