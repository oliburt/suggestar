import React from "react";
import { Form } from "semantic-ui-react";

const ImageUploader = ({handleChange}) => {
  
  
  return (
    <div>
      <h1>Upload Image</h1>
      <Form.Input type="file" name="file" placeholder="Upload an Image" onChange={handleChange}/>
      
    </div>
  );
};

export default ImageUploader;
