import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRouter } from "next/router";
import { useDeleteData } from "../hooks/useData";
import Button from "./Button";

interface ModalDeleteProps {
  modalDelete: boolean;
  closeModalDelete: () => void;
  username: string;
  userId: string;
}

const ModalDelete: React.FC<ModalDeleteProps> = (props) => {
  const router = useRouter();
  const btnDelete = () => {
    deleteUser(props.userId);
    props.closeModalDelete();
    router.replace(router.asPath);
  };

  const { deleteUser } = useDeleteData();

  return (
    <Dialog open={props.modalDelete} onClose={props.closeModalDelete} fullWidth>
      <DialogTitle>Delete User - {props.username}</DialogTitle>
      <DialogContent>Are you sure want to delete this user?</DialogContent>
      <DialogActions>
        <Button variant="text" onClick={props.closeModalDelete} title="Cancel" color="warning" />
        <Button variant="text" onClick={btnDelete} title="Delete" color="error" />
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
