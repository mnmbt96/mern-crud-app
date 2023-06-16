import React from "react";
import { Button, Typography, Modal, Card } from "@material-ui/core";
import useStyles from "./styles";

const ConfirmationModal = ({ isModalOpen, action, actionName, closeModal }) => {
  const classes = useStyles();

  return (
    <Modal className={classes.modal} open={isModalOpen} onClose={closeModal}>
      <Card className={classes.modalInnterContainer}>
        <Typography className={classes.modalTitle} variant="h6">
          {`${actionName} Confirmation`}
        </Typography>
        <Typography variant="body1">
          {`Are you sure you want to ${actionName}?`}
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={closeModal}
            className={classes.modalButton}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={action}
            className={classes.modalButton}
          >
            {actionName}
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default ConfirmationModal;
