import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Tab, Tabs } from "react-bootstrap";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const TabbedForm = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  const handleError = (errors: any) => {
    // Map errors to tabs
    if (errors.name || errors.email) {
      setActiveTab("tab1");
    } else if (errors.password || errors.confirmPassword) {
      setActiveTab("tab2");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, handleError)}>
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "tab1")}>
        {/* Tab 1 */}
        <Tab eventKey="tab1" title="User Info" tabClassName={errors.name || errors.email ? "text-danger" : ""}>
          <div className="mt-3">
            <label>Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          <div className="mt-3">
            <label>Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
        </Tab>

        {/* Tab 2 */}
        <Tab eventKey="tab2" title="Security" tabClassName={errors.password || errors.confirmPassword ? "text-danger" : ""}>
          <div className="mt-3">
            <label>Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              type="password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mt-3">
            <label>Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === (document.querySelector("input[name='password']") as HTMLInputElement)?.value || "Passwords do not match",
              })}
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              type="password"
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
          </div>
        </Tab>
      </Tabs>

      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  );
};

export default TabbedForm;
