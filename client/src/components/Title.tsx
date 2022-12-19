import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface IProps {
  title: string;
}

export default function Title({ title }: IProps) {
  return (
    <>
      <Helmet>
        <title>Tally | {title}</title>
      </Helmet>
      <Container sx={{ mb: '1rem' }}>
        <Typography component='h1' variant='h1' textAlign='center'>
          {title}
        </Typography>
      </Container>
    </>
  );
}