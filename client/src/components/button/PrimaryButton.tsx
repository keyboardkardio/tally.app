import Button from '@mui/material/Button';

interface IProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export default function PrimaryButton(props: IProps) {
  return (
    <Button
      fullWidth
      size='large'
      variant='contained'
      onClick={props.onClick}
      sx={{
        color: '#f6f4f5',
        backgroundColor: '#1b1c22',
        fontWeight: 600,
        letterSpacing: '0.1rem',
      }}
    >
      {props.children}
    </Button>
  );
}
