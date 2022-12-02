import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Title from 'src/components/Title';
import { api } from 'src/api/api';
import { ToastContext } from 'src/contexts/ToastContext';

const loginSchema = yup.object({
    username: yup.string()
        .required('Please enter your username.')
        .min(4, 'Usernames have a minimum length of four characters.')
        .max(50, 'Username exceeded 50 character limit.'),
    password: yup.string()
        .required('Please enter your password to continue.')
        .min(8, 'Passwords have a minimum length of eight characters.')
        .max(32, 'Password exceeded the 32 character limit.'),
});

export interface UserCredentials extends yup.InferType<typeof loginSchema> {
    token: string;
    user: {
        id: number;
        username: string;
    };
}

export default function Login() {
    const navigate = useNavigate();
    const { addToast } = useContext(ToastContext);
    const [loading, setLoading] = React.useState(false);
    
    const { register, handleSubmit, formState: { errors } } = useForm<UserCredentials>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (userInput: UserCredentials) => {
        try {
            setLoading(true);
            const response = await api.post<UserCredentials>('/login', userInput);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (error: any) {
            if (error.response?.status === 500) {
                addToast("Invalid username/password. Please try again.", "error");
            } else {
                addToast("Error. Please try again in a few moments.", "error");
            }
        }
    };

    return (
      <>
        <Paper elevation={8} sx={{ p: '1rem' }} component='form' onSubmit={handleSubmit(onSubmit)}>
          <Title title='Login' />
          <Stack spacing={2}>
            <TextField
              label='username'
              {...register('username')}
              error={!!errors['username']}
              helperText={errors?.username && errors.username.message}
            />
            <TextField
              type='password'
              label='password'
              {...register('password')}
              error={!!errors['password']}
              helperText={errors?.password && errors.password.message}
            />
            <Box sx={{ pt: '1rem', textAlign: 'center' }}>
              <Link to='/register'>Don't have an account?</Link>
            </Box>
            <LoadingButton
              fullWidth
              variant='contained'
              type='submit'
              loading={loading}
              loadingIndicator='Logging in..'
            >
              Log In
            </LoadingButton>
          </Stack>
        </Paper>
      </>
    );
}
