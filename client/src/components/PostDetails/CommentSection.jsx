import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    );

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const RenderComment = () => {
    if (!comments.length) {
      return user ? (
        <Typography variant="body1">No comment yet.</Typography>
      ) : (
        <Typography variant="body1">
          No comment yet. Please login to comment.
        </Typography>
      );
    }
    if (comments.length > 0) {
      return comments.map((c, i) => (
        <>
          <Typography key={i} gutterBottom variant="h6">
            <strong>{c.split(": ")[0]}</strong>
            {c.split(":")[1]}
          </Typography>
          {!user && (
            <Typography variant="body1">Please login to comment.</Typography>
          )}
        </>
      ));
    }
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h5">
            Comments
          </Typography>
          <RenderComment />
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "50%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
