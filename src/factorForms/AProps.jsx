import React from "react";
import { Input } from "semantic-ui-react";

const AProps = ({ maxTime, blockInfo, setBlockInfo }) => {
  return (
    <div>
      Gain of{" "}
      <Input
        label="$"
        onChange={(e, { value }) => setBlockInfo({ ...blockInfo, amt: value })}
      />{" "}
      starting at period{" "}
      <Input
        defaultValue="1"
        onChange={(e, { value }) =>
          setBlockInfo({ ...blockInfo, start: value })
        }
      />{" "}
      to{" "}
      <Input
        defaultValue={maxTime}
        onChange={(e, { value }) => setBlockInfo({ ...blockInfo, end: value })}
      />
    </div>
  );
};

export default AProps;
