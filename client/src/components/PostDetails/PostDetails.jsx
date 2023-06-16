import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { getPost, getPostBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import { deletePost } from "../../actions/posts";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { toast } from "react-toastify";
import Likes from "../Likes/Likes";

const PostDetails = () => {
  const postsState = useSelector((state) => state.posts);
  const { post } = postsState.post;
  const posts = postsState.posts;
  const isLoading = postsState.isLoading;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id || user?.result?.sub;

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [dispatch, post]);

  if (!post || isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    navigate("/posts");
    setIsModalOpen(false);
    toast.success("Post deleted");
  };

  const handleBack = () => {
    navigate("/posts");
  };

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  };

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Button
            variant="contained"
            onClick={handleBack}
            style={{ marginBottom: "20px" }}
          >
            <ArrowBackIcon style={{ paddingRight: "5px" }} />
            Back to list
          </Button>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => (tag === "" ? "" : `#${tag} `))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <div className={classes.buttons}>
            <Likes post={post} size="medium" />
            {post?.creator === userId && (
              <Button
                color="secondary"
                onClick={() => setIsModalOpen(true)}
                className={classes.button}
              >
                <DeleteIcon />
                Delete
              </Button>
            )}
          </div>

          <ConfirmationModal
            isModalOpen={isModalOpen}
            action={handleDelete}
            actionName="delete"
            closeModal={() => setIsModalOpen(false)}
          />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title || ""}
          />
        </div>
      </div>
      <Divider style={{ margin: "20px 0" }} />
      <CommentSection post={post} />
      {recommendedPosts.length > 0 && (
        <div>
          <Divider style={{ margin: "20px 0" }} />
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">
              You might also like
            </Typography>
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(
                ({ title, message, name, likes, selectedFile, _id }) => (
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">
                      {title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {message}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <img
                      src={selectedFile}
                      alt={post.title || ""}
                      width="200px"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
