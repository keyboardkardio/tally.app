import Button from '@mui/material/Button';

interface IProps {
  type: 'submit' | 'button'
  children?: React.ReactNode;
}

export default function SecondaryButton(props: IProps) {
  return (
    <Button
      fullWidth
      size='large'
      variant='contained'
      type={props.type}
      sx={{
        color: '#f6f4f5',
        backgroundColor: '#43c780',
        fontWeight: 600,
        letterSpacing: '0.1rem',
      }}
    >
      {props.children}
    </Button>
  );
}
