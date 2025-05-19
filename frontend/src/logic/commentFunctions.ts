export async function createComment(
  articleID: string,
  comment: string,
  userInfo: any
) {
  handleEmptyComments(comment);

  // If article is not already in the database, put article in database
//   console.log("Article ID:", articleID);
//   await postArticle(articleID);

  // Put comment in database
  console.log("Username:", userInfo.user["name"]);
  console.log("User email:", userInfo.user["email"]);
  console.log("Comment:", comment);
  await postComment(articleID, userInfo, comment);
}

async function postComment(articleID: string, userInfo: any, comment: string) {
  const data = {
    "article_id": articleID,
    "username": userInfo.user["name"],
    "comment": comment,
  };

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

async function postArticle(articleID: string) {
  const data = {
    id: articleID,
  };

  try {
    await fetch("http://localhost:8000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Failed to push article to database", error);
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
