export async function createComment(
  articleID: string,
  comment: string,
  userInfo: any
) {
  handleEmptyComments(comment);

  // Put comment in database
  console.log("Username:", userInfo.user["name"]);
  console.log("User email:", userInfo.user["email"]);
  console.log("Comment:", comment);
  await postComment(articleID, userInfo, comment);
}

async function postComment(articleID: string, userInfo: any, comment: string) {
  const data = {
    article_id: articleID,
    username: userInfo.user["name"],
    comment: comment,
  };
  console.log(data);

  try {
    await fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Failed to push comment to database", error);
  }
  return null;
}

export function deleteComment() {}

function handleEmptyComments(comment: string) {
  if (comment == "") {
    console.log("Empty comment");
    document.getElementById("error-text")!.style.visibility = "visible";
    return;
  }
  document.getElementById("error-text")!.style.visibility = "hidden";
}
