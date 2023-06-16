import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  modalInnterContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  modalButton: {
    margin: "20px 10px 0 10px",
  },
});
