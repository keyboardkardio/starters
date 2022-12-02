import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Title from 'src/components/Title';
import { api } from 'src/api/api';
import { ToastContext } from 'src/contexts/ToastContext';

const registrationSchema = yup.object({
    username: yup.string()
        .min(4, 'Username must have a length of at least four characters.')
        .max(50, 'Username exceeds the 50 character limit.')
        .required('Please enter a username.'),
    password: yup.string()
        .min(8, 'Passwords should have a minimum length of eight characters.')
        .max(32, 'Password exceeds the 32 character limit.')
        .required('A password is required to register.'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password')], 'Passwords do not match, please try again.')
        .required('Please confirm your password.'),
});

export interface RegistrationFormValues extends yup.InferType<typeof registrationSchema> {}

export default function Register() {
    const navigate = useNavigate();
    const { addToast } = useContext(ToastContext);

    const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormValues>({
        resolver: yupResolver(registrationSchema)
    });

    const onSubmit = async (userInput: RegistrationFormValues) => {
      try {
            const response = await api.post<RegistrationFormValues>('/register', userInput);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error: any) {
            if (error.response?.status === 400) {
                addToast("Username is unavailable, please try a different one.", "error");
            }
        }
    };

    return (
      <>
        <Paper elevation={8} sx={{ p: '1rem' }}>
          <Title title='Register' />
          <Stack spacing={2} component='form' onSubmit={handleSubmit(onSubmit)}>
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
            <TextField
              type='password'
              label='confirm password'
              {...register('passwordConfirmation')}
              error={!!errors['passwordConfirmation']}
              helperText={errors?.passwordConfirmation && errors.passwordConfirmation.message}
            />
            <Box sx={{ pt: '1rem', textAlign: 'center' }}>
              <Link to='/login'>Already have an account?</Link>
            </Box>
            <Button fullWidth variant='contained' type='submit' onClick={handleSubmit(onSubmit)}>
              Create Account
            </Button>
          </Stack>
        </Paper>
      </>
    );
}
