import React from "react";

const FormWrapper = ({ children, windowWidth }) => {
  return windowWidth > 600 ? (
    <div style={{ maxWidth: "50vw", margin: "0 auto" }}>{children}</div>
  ) : (
    <>{children}</>
  );
};

export default FormWrapper;
