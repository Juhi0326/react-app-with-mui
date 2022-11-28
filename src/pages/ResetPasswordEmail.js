import * as React from 'react';
import CustomButton from '../components/CustomButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { toastShow } from '../store/actions'
import authService from '../services/authService';
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const ResetPasswordEmail = () => {

    const validationSchema = Yup.object().shape({
        email:Yup.string()
        .required('Email is required')
        .matches(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email!'),
 });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const dispatch = useDispatch()
    const [email, setEmail] = React.useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm(formOptions);

    const onSubmit = (event) => {
        authService
        .sendResetPasswordEmail(email)
        .then((response) => {
          reset()
          dispatch(toastShow(`Email sent successfully! `, 'success'))
        })
        .catch((err) => {
          if (err.response.data.Error) {
            dispatch(toastShow('unexpected error! Error message: ' + err.response.data.Error, 'error'))
          }  else {
            dispatch(toastShow('unexpected error! Error message: ' + err, 'error'))
          }
        });

    };

    return (
        <Container component="main" >
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    
                }}
            >
                <Typography component="h1" variant="h2"
                sx={{ mt: 3, mb: 16 }}>
                Forgot yor password?
                </Typography>
                <Typography component="h2" variant="h5"
                sx={{  mb: 8 }}>
                Don't worry, just enter your email address and click the Send button! Click on the link in the email, but make sure that you must enter the new password within 1 hour of sending it.
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, minWidth: 400, }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        {...register('email')}
                        autoComplete="email"
                        onChange={(e) => { setEmail(e.target.value) }}
                        error={!!errors?.email}
                        helperText={errors?.email ? errors?.email.message : null}
                    />
                    
                    <CustomButton
                        type={"submit"}
                        value='Send'
                        fullWidth='fullWidth'
                        variant={'contained'}
                        color={'primary'}
                        btnSize={'medium'}
                        sx={{ mt: 3, mb: 2 }}
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default ResetPasswordEmail;