import { Button, ButtonProps } from "@mui/material";

type ButtonComponentProps = ButtonProps & {
    onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ onClick, children, ...props }) => {
    return (
        <Button variant="contained" onClick={onClick} fullWidth style={{margin: '10px'}} {...props}> {children} </Button>
    );
}

export default ButtonComponent;
