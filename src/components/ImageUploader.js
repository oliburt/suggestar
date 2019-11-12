import React from "react";
import { Form } from "semantic-ui-react";

const ImageUploader = ({ handleChange }) => {
  return (
    <div>
      <Form.Input
        type="file"
        label="Image Upload (optional)"
        name="file"
        placeholder="Upload an Image"
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUploader;
