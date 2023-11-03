import { Typography, TypographyProps } from "@mui/material";

type TypographyComponentProps = TypographyProps & {
    children: React.ReactNode;
};

const TypographyComponent: React.FC<TypographyComponentProps> = ({children, variant = "body1", align = "inherit", ...props }) => { 
    return <Typography variant={variant} align={align} {...props}>{children}</Typography>;
}

export default TypographyComponent;
