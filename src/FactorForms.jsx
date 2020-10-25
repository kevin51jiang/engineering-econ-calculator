import React from "react";
import { Dropdown } from "semantic-ui-react";
import { factorForms } from "./consts";

const factorOptions = [
  {
    key: "PW",
    text: "(P) Present Worth",
    value: "PW",
  },
  {
    key: "FW",
    text: "(F) Future Worth",
    value: "FW",
  },
  {
    key: "A",
    text: "(A) Annuity",
    value: "A",
  },
  {
    key: "AG",
    text: "(G) Arithmetic Gradient",
    value: "AG",
  },
  {
    key: "GG",
    text: "(none) Geometric Gradient",
    value: "GG",
  },
];

const FactorForms = (props) => {
  return (
    <span>
      <Dropdown
        inline
        options={factorOptions}
        defaultValue={factorOptions[0].value}
        onChange={(e, { value }) => props.onChange(value)}
      />
    </span>
  );
};

export default FactorForms;
