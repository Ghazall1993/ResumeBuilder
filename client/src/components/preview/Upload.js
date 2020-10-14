import React from "react";
import { Button } from "react-bootstrap";

export function Upload({ onFileImported, onCancel }) {

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      onFileImported(e.target.result);
    };
  };
  return (
    <>
      <div className="upload-header">
        <h2 className="my-3 bold">Upload Json file</h2>
        <Button
          variant="light"
          onClick={onCancel}
        >X</Button>
      </div>
      <input type="file" onChange={handleChange} />
    </>
  );
}
