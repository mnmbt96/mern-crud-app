import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { likePost } from "../../actions/posts";

const Likes = ({ post, size }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?._id || user?.result?.sub;
  const hasLikedPost = post?.likes.find((like) => like === userId);
  const dispatch = useDispatch();

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const RenderLikes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize={size} />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize={size} />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpAltOutlined fontSize={size} />
          &nbsp;Like
        </>
      );
    }
  };

  return (
    <Button
      size={size}
      color="primary"
      disabled={!user?.result}
      onClick={handleLike}
    >
      <RenderLikes />
    </Button>
  );
};

export default Likes;
