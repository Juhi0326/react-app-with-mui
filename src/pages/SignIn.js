import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CustomButton from '../components/CustomButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import { useSelector, useDispatch } from 'react-redux';
import authService from '../services/authService';

export default function SignIn() {
    
    //const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
        email: data.get('email'),
        password: data.get('password'),
      }
      authService.login(user)
        .then((response) => {
          const loggedUser = {
            userName: response.userName,
            userId: response.userId,
            role: response.role,
            email: response.useemailrName,
            accessToken: response.accessToken,
          }
          console.log(loggedUser);
          //dispatch(signIn(loggedUser))
          
        })
        .catch((err) => {
          console.log(err)
        });

    console.log({
      email: data.get('email'),
      password: data.get('password'),
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
            <CustomButton 
                            type={"submit"}
                            value='Sign in'
                            fullWidth='fullWidth'
                            variant={'contained'}
                            color= {'primary'}
                            btnSize={'medium'}
                            sx={{ mt: 3, mb: 2}}
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}