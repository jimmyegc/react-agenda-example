import { useForm } from "../../hooks/useForm";

export const LoginForm = () => {
  const { values, handleChange } = useForm({ email: "", password: "" });

  return (
    <form>
      <input name="email" value={values.email} onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" value={values.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
