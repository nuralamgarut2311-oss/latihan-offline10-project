// src/component/ResetButton.js

import React from "react";
import { Button } from "react-bootstrap";

const ResetButton = ({ resetKeranjang }) => {
  return (
    <Button
      variant="danger"
      className="mt-3 w-100"
      onClick={resetKeranjang}
    >
      Reset Hasil
    </Button>
  );
};

export default ResetButton;
