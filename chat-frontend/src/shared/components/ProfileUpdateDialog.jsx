import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import {useForm, Controller} from "react-hook-form";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "config/firebase";
import { updateProfile } from "firebase/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const profileGGSchema = yup.object({
  displayName: yup.string().required("Cần phải có tên để hiển thị bạn ơi!"),
  photoURL: yup.string().required("Cần phải có hình ảnh đại diện bạn ơi! ").url(),
}).required();

export default function ProfileUpdateDialog(props) {
  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      displayName: user.displayName,
      photoURL: user.photoURL
    },
    resolver: yupResolver(profileGGSchema)
  });

  const onSubmit = data => {
    if (Object.keys(data).length === 0) return;

    updateProfile(auth.currentUser, {
      displayName: data.displayName,
      photoURL: data.photoURL
    }).then((a) => {
      console.log('a', a)
      setOpen(false)
      props.getUserDetail()
    }).catch((error) => {
      console.log('error', error)
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} sx={{color: "#fff"}} aria-label="delete" size="small">
        <EditIcon fontSize="inherit"/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cập nhật thông tin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có thể cập nhật các thông tin bên dưới.
          </DialogContentText>
          <form>
            <Controller
              name="displayName"
              control={control}
              render={({field}) => {
                return (
                  <TextField
                    error={Object.hasOwn(errors, "displayName")}
                    autoFocus
                    margin="dense"
                    id="displayName"
                    label="Tên người dùng"
                    type="text"
                    fullWidth
                    variant="standard"
                    helperText={errors?.diplayName?.message}
                    {...field}
                  />
                );
              }}
            />

            <Controller
              name="photoURL"
              control={control}
              render={({field}) => {
                return (
                  <TextField
                    error={Object.hasOwn(errors, "photoURL")}
                    autoFocus
                    margin="dense"
                    id="photoURL"
                    label="Ảnh đại diện"
                    type="text"
                    fullWidth
                    variant="standard"
                    helperText={errors?.photoURL?.message}
                    {...field}
                  />
                );
              }}
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleSubmit(onSubmit)}>Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}