import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { PostAuthor } from "./PostAuthor"
import { ReactionButtons } from "./ReactionButtons"

import { selectAllPosts, fetchPosts } from "./postsSlice"


export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(state => state.posts.status)

    console.log("posts are: ", posts)

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.user}/>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
            <ReactionButtons post={post}/>
        </article>
    ))

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}