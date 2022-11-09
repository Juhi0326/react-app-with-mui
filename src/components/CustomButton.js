import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';


export default function CustomButton({ variant, color, value, onClick, btnSize, sx, fullWidth, type, disableElevation }) {

    const theme = useTheme();

    React.useEffect(() => {
        console.log(color)
    }, [color])

    CustomButton.propTypes = {
        variant: PropTypes.string,
        value: PropTypes.string.isRequired,
        disableElevation:PropTypes.bool
        //onClick: PropTypes.func.isRequired
    }
    
    CustomButton.defaultProps = {
        variant:'contained',
        btnSize:''
    }
  return (
    <Stack spacing={2} direction="row">
    <CssBaseline />
      <Button 
      variant={variant}
      onClick={(event) => {onClick && onClick(event)}}
      color={theme.color}
      size={btnSize}
      sx={sx}
      fullWidth={fullWidth ? true : false}
      type={type}
      disableElevation = {disableElevation}
      >
      {value}</Button>
    </Stack>
  );


}