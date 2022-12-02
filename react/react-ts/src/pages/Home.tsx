import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Title from 'src/components/Title';

export default function Home() {
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };
    
    return (
      <>
        <Title title='Home' />
        <Box sx={{ textAlign: 'center' }}>
          <Button variant='contained' onClick={logout}>
            Log out
          </Button>
        </Box>
      </>
    );
}
