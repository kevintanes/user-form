import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRouter } from "next/router";
import { useUpdateData } from "../hooks/useData";
import Button from "./Button";

interface ModalSaveEditProps {
    modalEdit: boolean;
    closeModalEdit: VoidFunction;
    userId: string;
    username: string;
    email: string;
    phone: string;
    address: string;
}

const ModalSaveEdit: React.FC<ModalSaveEditProps> = (props) => {

    const { updateUser } = useUpdateData();
    const router = useRouter()
    const btnSave = () => {
        updateUser(props.userId, props.username, props.email, props.phone, props.address);
        router.push("/")
    };

    return (
        <Dialog open={props.modalEdit} onClose={props.closeModalEdit} fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>Are you sure want to edit this user?</DialogContent>
            <DialogActions>
                <Button variant="text" onClick={props.closeModalEdit} title="Cancel" color="warning" />
                <Button variant="text" onClick={btnSave} title="Save" color="primary" type="submit" />
            </DialogActions>
        </Dialog>
    )
}

export default ModalSaveEdit;