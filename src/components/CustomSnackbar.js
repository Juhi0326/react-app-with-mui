import { useEffect, Fragment, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { toastHide } from '../store/actions';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';


export default function CustomSnackbar() {

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const toastState = useSelector(state => state.toast.state);
    const backGround = useSelector(state => state.toast.textType);
    const toastMessage = useSelector(state => state.toast.payload);
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
    }, [toastState, backGround, toastMessage])

    const hideToast = () => {
        dispatch(toastHide())
    }

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color='inherit'
                onClick={hideToast}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );
    return (
        <Stack spacing={2} direction="row">
            <CssBaseline />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={toastState}
                autoHideDuration={6000}
                action={action}
                onClose={hideToast}
                >
                <Alert onClose={hideToast} severity={backGround} sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>

        </Stack>
    );


}