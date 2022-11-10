import * as React from 'react';
import CustomButton from '../components/CustomButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { toastShow } from '../store/actions'
import authService from '../services/authService';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const RegisterForm = () => {

    const validationSchema = Yup.object().shape({
        userName:Yup.string()
            .required('user name is required')
            .matches(/^[a-zA-ZíÍéÉáÁőŐűŰúÚóÓüÜ0-9-. ]{3,20}$/g, 'the username can only consist of normal characters and numbers, from 3 to 20 characters'),
        email:Yup.string()
        .required('Email is required')
        .matches(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email!'),
        password: Yup.string()
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\\[-`{-~]).{6,20}$/g, 'invalid password pattern!'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
            
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [file, setFile] = React.useState(null);

    const goToSignIn = () => {
        navigate('/sign-in')
    }
    const selectFile = (event) => {
        setFile(event.target.files[0])
    }
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);

    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        let image = data.get('btn-upload')
        setFile(image)
        const user = new FormData();
        user.append("userName", userName);
        user.append("email", email);
        user.append("password", password);
        user.append("role", "user");
        user.append("userImage", file);

        console.log(JSON.stringify(user))
        authService.RegisterForm(user)
            .then((response) => {
                const loggedUser = {
                    userName: response.userName,
                    userId: response.userId,
                    role: response.role,
                    email: response.useemailrName,
                }
                console.log(loggedUser);
                event.target.reset()

                dispatch(toastShow(`Sikeres Regisztráció, most már bejelentkezhetsz! `, 'success'))
                navigate('/sign-in')


            })
            .catch((err) => {
                console.log(err)
                dispatch(toastShow('Sikertelen Regisztráció! részletes hibaüzenet: ' + err, 'danger'))
            });

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
                    Register Form
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                        {...register('userName')}
                        autoComplete="userName"
                        onChange={(e) => { setUserName(e.target.value) }}
                        error={!!errors?.userName}
                        helperText={errors?.userName ? errors?.userName.message : null}
                    />
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        {...register('password')}
                        label="Password"
                        type="password"
                        id="password"
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
                        onChange={(e) => { setPassword(e.target.value) }}
                        error={!!errors?.confirmPassword}
                        helperText={errors?.confirmPassword ? errors?.confirmPassword.message : null}
                    />
                    <label htmlFor="btn-upload">
                        <input
                            id="btn-upload"
                            name="btn-upload"
                            style={{ display: 'none' }}
                            type="file"
                            onChange={selectFile} />
                        <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span" >
                            Choose Files
                        </Button>
                    </label>
                    <CustomButton
                        type={"submit"}
                        value='Register'
                        fullWidth='fullWidth'
                        variant={'contained'}
                        color={'primary'}
                        btnSize={'medium'}
                        sx={{ mt: 3, mb: 2 }}
                    />
                    <Grid container>
                        <Grid item>
                            <Link
                                component="button"
                                variant="body2"
                                color="secondary"
                                onClick={() => {
                                    goToSignIn()
                                }} >
                                {"Do you already have an account? Sign In!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default RegisterForm;