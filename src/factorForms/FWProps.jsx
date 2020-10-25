import React from "react";
import { Input } from "semantic-ui-react";

const FWProps = ({ blockInfo, setBlockInfo }) => {
  return (
    <div>
      A value of{" "}
      <Input
        label="$"
        onChange={(e, { value }) => {
          setBlockInfo({ ...blockInfo, amt: value });
        }}
        value={blockInfo.amt}
      />{" "}
      gained at the end of{" "}
      <Input
        type="number"
        onChange={(e, { value }) => setBlockInfo({ ...blockInfo, date: value })}
      />{" "}
      periods.
    </div>
  );
};

export default FWProps;
