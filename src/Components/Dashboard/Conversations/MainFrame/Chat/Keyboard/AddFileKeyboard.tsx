import React from "react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { Tooltip } from "@mui/material";

const AddFileKeyboard = () => {
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files;
    console.log(file);
  };

  return (
    <>
      <Tooltip title="Files" arrow>
        <label
          htmlFor="fileInput"
          className="cursor-pointer hover:text-gray-500 transition-all"
        >
          <AttachFileOutlinedIcon fontSize="small" />
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileSelected}
            accept=".png , .jpg , .jpeg"
          />
        </label>
      </Tooltip>
    </>
  );
};

export default AddFileKeyboard;
