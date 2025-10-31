import { Button } from "@mui/material"




const BtnPrimary = ({title, onClick, type = "button", fullWidth = true, sx={} }) => {
  return (
    <Button
        variant="contained"
        fullWidth={fullWidth}
        type={type}
        onClick={onClick}
        sx={{mt:3, py:1.2, ...sx}}
    >
      {title}
    </Button>
  )
}

export default BtnPrimary
