import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * 
 * React Helmet is a reusable component that manages all changes to the document 
 * head. In this case, the title will change every time the user navigates to a
 * different page and will display accordingly in the browser's tab.
 */

interface IProps {
    title: string;
}

export default function Title({ title }: IProps) {
    return (
      <>
        <Helmet>
          <title>tally.app | {title}</title>
        </Helmet>
        <Box sx={{ mb: '2rem' }}>
          <Typography component='h2' variant='h2' textAlign='center' fontWeight={700}>
            {title}
          </Typography>
        </Box>
      </>
    );
}
