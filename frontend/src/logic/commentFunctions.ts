export function createComment(articleID: string, comment: string, userInfo: any) {
    // Don't put any empty comments in database
    if (comment == "" ) {
        console.log("Empty comment")
        return
    }

    // If article is not already in the database, put article in database
    console.log("Article ID:", articleID)

    // Put comment in database
    console.log("Username:", userInfo.user["name"])
    console.log("Comment:", comment)
}

export function deleteComment() {

}