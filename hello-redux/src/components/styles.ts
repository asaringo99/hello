// styles.ts
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';

export const StyledRoot = styled('div')(({ theme }) => ({
  '& > *': {
    margin: theme.spacing(1),
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const StyledDeleteButton = styled(Fab)(({ theme }) => ({

}));

export const StyledLargeTextField = styled(TextField)({
  margin: '10%',
});
