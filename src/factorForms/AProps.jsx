import React from "react";
import { Input } from "semantic-ui-react";

const AProps = ({ blockInfo, setBlockInfo }) => {
  return (
    <div>
      Gain of{" "}
      <Input
        label="$"
        onChange={(e, { value }) => setBlockInfo({ ...blockInfo, amt: value })}
      />{" "}
      every period starting at period 1.
    </div>
  );
};

export default AProps;
