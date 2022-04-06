import React from 'react'
import contents from '../data/contents'
import Comment from './Comment'

function allcomments() {
    return (
        <div>
            {contents.comments.map((comment) => (
                <Comment
                    key={comment.id}
                    id={comment.id}
                    content={comment.content}
                    time={comment.createdAt}
                    score={comment.score}
                    image={comment.user.image.png}
                    username={comment.user.username}
                    replies={comment.replies}
                />
            ))}
        </div>
    )
}

export default allcomments