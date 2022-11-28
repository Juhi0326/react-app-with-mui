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
import { useParams } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const AddNewPassword = () => {

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\\[-`{-~]).{6,20}$/g, 'invalid password pattern!'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const params = useParams();
    const dispatch = useDispatch()
    const [password, setPassword] = React.useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm(formOptions);

    const onSubmit = (event) => {
        authService.receiveNewPassword(params.id, params.token, {password: password}).then((response) => {
            dispatch(toastShow(`password reseted!`, 'success'))
            reset()
            
        }).catch((err) => {
            console.log(err.response.data)
            dispatch(toastShow(`password had not reseted!`, 'error'))
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Reset password
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        {...register('password')}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete='off'
                        onChange={(e) => { setPassword(e.target.value) }}
                        error={!!errors?.password}
                        helperText={errors?.password ? errors?.password.message : null}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        {...register('confirmPassword')}
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete='off'
                        onChange={(e) => { setPassword(e.target.value) }}
                        error={!!errors?.confirmPassword}
                        helperText={errors?.confirmPassword ? errors?.confirmPassword.message : null}
                    />

                    <CustomButton
                        type={"submit"}
                        value='Add new password'
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

export default AddNewPassword;