import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import PostContainer from "../../components/postContainer"
import { getUserPosts } from "../../store/postsSlice"

const User = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserPosts(id))
    }, [])
    const {userPosts, isLoading} = useSelector(state => state.posts)
    return (
        <>
            <PostContainer posts={ userPosts } isLoading={ isLoading } isUser={true} />
        </>
    )
}

export default User