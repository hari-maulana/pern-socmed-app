import { Input } from "@mui/material";

interface InputFieldProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, type, value, onChange }) => {
  return <Input type={type} placeholder={placeholder} value={value}
  onChange={onChange} sx={{border: "2px solid gray", borderRadius: "10px", color: "silver", padding: "5px", marginTop: "20px"}} required/>;
};

export default InputField;