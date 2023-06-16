import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const Form = ({ currentId, setCurrentId }) => {
  const [postsData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClearModalOpen = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const isFormEmpty = () => {
    return postsData.title.trim() === "" || postsData.message.trim() === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentId) {
      if (isFormEmpty()) {
        toast.error("Please fill in all the required fields.");
        return;
      }
      dispatch(
        createPost({ ...postsData, name: user?.result?.name }, navigate)
      );
      toast.success("New post created!");
    } else {
      dispatch(
        updatePost(currentId, { ...postsData, name: user?.result?.name })
      );
      toast.success("Post Updated!");
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setIsModalOpen(false);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own posts and like other's posts.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Post
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          required
          value={postsData.title}
          onChange={(e) => setPostData({ ...postsData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          required
          value={postsData.message}
          onChange={(e) =>
            setPostData({ ...postsData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postsData.tags}
          onChange={(e) =>
            setPostData({ ...postsData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postsData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClearModalOpen}
          fullWidth
        >
          Clear
        </Button>
        <ConfirmationModal
          isModalOpen={isModalOpen}
          action={clear}
          actionName="clear"
          closeModal={() => setIsModalOpen(false)}
        />
      </form>
    </Paper>
  );
};

export default Form;
