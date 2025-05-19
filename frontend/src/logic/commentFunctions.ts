import type { commentType } from "../components/comment.svelte";

// Functions to do with comment GET requests
export async function getAllComments() {
  try {
    const res = await fetch("http://localhost:8000/comments");
    const allComments = await res.json();
    return allComments;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }
  return null;
}

export function filterComments(allComments: any, articleID: string) {
  return allComments.filter((comment: commentType) => comment.article_id === articleID);
}

// Functions to do with comment POST requests
export async function createComment(
  articleID: string,
  comment: string,
  userInfo: any,
) {
  handleEmptyComments(comment);

  // Put comment in database
  await postComment(articleID, userInfo, comment);
}

async function postComment(articleID: string, userInfo: any, comment: string) {
  const data = {
    article_id: articleID,
    username: userInfo.user["name"],
    comment: comment,
  };

  try {
    await fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Failed to push comment to database", error);
  }
  return null;
}

function handleEmptyComments(comment: string) {
  if (comment == "") {
    console.log("Empty comment");
    document.getElementById("error-text")!.style.visibility = "visible";
    return;
  }
  document.getElementById("error-text")!.style.visibility = "hidden";
}
