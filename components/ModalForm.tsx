import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormHelperText } from "@mui/material";
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

  const btnCancelUser = () => {
    formik.resetForm();
    props.closeModalAdd();
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      address: '',
    },
    onSubmit: btnSaveUser,
    validationSchema: yup.object().shape({
      username: yup.string().required().min(3),
      email: yup.string().required().email(),
      phone: yup.string().required().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "phone must be a valid phone").min(8),
      address: yup.string().required().min(6)
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
          error={Boolean(formik.errors.username)}
          required
        />
        {
          formik.errors.username && formik.touched.username ? (
            <FormHelperText>{formik.errors.username}</FormHelperText>
          ) : null
        }
        <TextField
          onChange={handleForm}
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          name="email"
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.email)}
          required
        />
        {
          formik.errors.email && formik.touched.email ? (
            <FormHelperText>{formik.errors.email}</FormHelperText>
          ) : null
        }
        <TextField
          onChange={handleForm}
          margin="dense"
          label="Phone"
          type="text"
          fullWidth
          variant="standard"
          name="phone"
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.phone)}
          required
        />
        {
          formik.errors.phone && formik.touched.phone ? (
            <FormHelperText>{formik.errors.phone}</FormHelperText>
          ) : null
        }
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
          error={Boolean(formik.errors.address)}
          required
        />
        {
          formik.errors.address && formik.touched.address ? (
            <FormHelperText>{formik.errors.address}</FormHelperText>
          ) : null
        }
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={btnCancelUser} title="Close" color="warning" type="button" />
        <Button variant="text" onClick={formik.handleSubmit} title="Save" type="submit" />
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
