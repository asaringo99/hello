import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/Hook';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { addParam, removeParam, updateParam } from '../app/reducers/paramstable/ActionCreater';
import { RootState } from '../app/Store';
import DeleteAlertDialog from './DeleteDialog';
import { StyledRoot, StyledDeleteButton } from './styles';

const ParamsForm: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const params = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(addParam());
  };

  const handleRemove = (index: number) => {
    dispatch(removeParam(index));
  };

  const handleUpdate = (index: number, field: string, value: any) => {
    const updatedParam = { ...params[index], [field]: value };
    dispatch(updateParam(index, updatedParam));
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  return (
    <StyledRoot>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleCheck} inputProps={{ 'aria-label': 'primary checkbox' }}/>}
        label={
          <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
            常に消去する
          </Typography>
        }
        labelPlacement='start'
      />
      {params.map((param, index) => (
        <div key={index}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gridGap: 20 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gridGap: 5 }}>
                <TextField
                  label="Min Value"
                  value={param.minValue}
                  onChange={(e) => handleUpdate(index, 'minValue', e.target.value)}
                />
                <TextField
                  label="Max Value"
                  value={param.maxValue}
                  onChange={(e) => handleUpdate(index, 'maxValue', e.target.value)}
                />
                <TextField
                  label="Range"
                  value={param.range}
                  onChange={(e) => handleUpdate(index, 'range', e.target.value)}
                />
              </Box>
              <TextField
                label="Weight"
                variant="outlined"
                multiline
                rows={3}
                defaultValue={param.weight}
                value={param.weight}
                onChange={(e) => handleUpdate(index, 'weight', e.target.value)}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0.5em' }}>
              <StyledDeleteButton
                variant="circular"
                color="error"
                aria-label="delete"
                size="small"
                onClick={() => handleRemove(index)}>
                <Tooltip title="パラメータを削除します" arrow>
                  <DeleteIcon />
                </Tooltip>
              </StyledDeleteButton>
            </Box>
          </Box>
        </div>
      ))}
      <Tooltip title="パラメータを増やします" arrow>
        <Fab color="primary" aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </StyledRoot>
  );
};

export default ParamsForm;
