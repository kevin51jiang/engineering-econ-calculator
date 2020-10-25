import React from "react";
import { Input } from "semantic-ui-react";

const PWProps = ({ blockInfo, setBlockInfo }) => {
  return (
    <div>
      Adding current value of{" "}
      <Input
        label="$"
        onChange={(e, { value }) => {
          setBlockInfo({ ...blockInfo, amt: value });
        }}
      />
      is added to the account.
    </div>
  );
};

export default PWProps;
