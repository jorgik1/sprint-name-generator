import { TextField, TextFieldProps } from "@mui/material";

type TextFieldComponentProps = TextFieldProps & {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({value, onChange, error, helperText, ...props }) => {
    return  <TextField label="OpenAI Key" value={value} onChange={onChange} fullWidth error={error} helperText={helperText} {...props} />;
}

export default TextFieldComponent;
