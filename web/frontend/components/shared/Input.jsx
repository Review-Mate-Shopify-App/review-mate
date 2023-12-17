import { TextField } from "@shopify/polaris";

export default function Input({
  type = "",
  value,
  label,
  onChange,
  multiline,
  autoComplete,
  placeholder,
}) {
  return (
    <TextField
      value={value}
      type={type}
      multiline={multiline}
      placeholder={placeholder}
      label={
        <label style={{ fontWeight: "bold", fontSize: "14px" }}>{label}</label>
      }
      onChange={onChange}
      autoComplete={autoComplete}
    />
  );
}
