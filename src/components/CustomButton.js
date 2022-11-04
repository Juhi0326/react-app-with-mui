import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types'

export default function CustomButton({ variant, color, value, onClick, btnSize }) {

    CustomButton.propTypes = {
        variant: PropTypes.string,
        value: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }
    
    CustomButton.defaultProps = {
        variant:'contained',
        btnSize:''
    }
  return (
    <Stack spacing={2} direction="row">
      <Button 
      variant={variant}
      onClick={(event) => onClick(event)}
      color={color}
      size={btnSize}
      >
      {value}</Button>
    </Stack>
  );


}