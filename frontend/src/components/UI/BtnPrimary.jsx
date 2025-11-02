import { Button } from "@mui/material"

import { useNavigate } from "react-router-dom"


const BtnPrimary = ({title, to, href, variant, onClick, type = "button", fullWidth = true, disabled = false, sx={} }) => {

    const navigate = useNavigate();

    const handleClick = (e) => {
      if(to) {
        navigate(to)
      } else if (href) {
        window.location.href = href;
      } else if (onClick) {
        onClick(e)
      }
    };
  
  return (
    <Button
        variant={variant}
        fullWidth={fullWidth}
        type={type}
        onClick={handleClick}
        disabled={disabled}
        sx={{mt:3, py:1.2, ...sx}}
    >
      {title}
    </Button>
  )
}

export default BtnPrimary
