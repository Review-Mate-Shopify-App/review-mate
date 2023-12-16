import { TextField } from "@shopify/polaris";

export default function Input({
  type = "",
  value,
  label,
  onChange,
  autoComplete,
}) {
  return (
    <TextField
      value={value}
      type={type}
      label={
        <label style={{ fontWeight: "bold", fontSize: "14px" }}>{label}</label>
      }
      onChange={onChange}
      autoComplete={autoComplete}
    />
  );
}
