import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useAddData } from "../hooks/useData";
import Button from "./Button";

interface ModalFormProps {
  modalAdd: boolean;
  closeModalAdd: () => void;
}

const ModalForm: React.FC<ModalFormProps> = (props) => {

  const router = useRouter();
  const { addUser } = useAddData();

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  const btnSaveUser = () => {
    addUser(formik.values.username, formik.values.email, formik.values.phone, formik.values.address);
    props.closeModalAdd();
    router.replace(router.asPath);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      address: '',
    },
    onSubmit: btnSaveUser,
    validationSchema: yup.object().shape({
      username: yup.string().min(3),
      email: yup.string().email(),
      phone: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "phone must be a valid phone").min(8),
      address: yup.string().min(6)
    })
  })

  return (
    <Dialog open={props.modalAdd} onClose={props.closeModalAdd} fullWidth >
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent
        sx={{
          mt: -2,
        }}
      >
        <TextField
          onChange={handleForm}
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          name="username"
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.username) && formik.touched.username}
          helperText={formik.errors.username}
          required
        />
        <TextField
          onChange={handleForm}
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          name="email"
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.email) && formik.touched.email}
          helperText={formik.errors.email}
          required
        />
        <TextField
          onChange={handleForm}
          margin="dense"
          label="Phone"
          type="text"
          fullWidth
          variant="standard"
          name="phone"
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.phone) && formik.touched.phone}
          helperText={formik.errors.phone}
          required
        />
        <TextField
          onChange={handleForm}
          margin="dense"
          multiline
          rows={3}
          label="Address"
          fullWidth
          type="text"
          variant="outlined"
          name="address"
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.address) && formik.touched.address}
          helperText={formik.errors.address}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={props.closeModalAdd} title="Close" color="error" type="button" />
        <Button variant="text" onClick={formik.handleSubmit} title="Save" type="submit" />
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
