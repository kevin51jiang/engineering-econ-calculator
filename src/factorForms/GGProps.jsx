import React from "react";
import { Input } from "semantic-ui-react";

const GGProps = ({ blockInfo, setBlockInfo, maxTime }) => {
  return (
    <div>
      A geometric gradient, starting at period{" "}
      <Input
        defaultValue="1"
        onChange={(e, { value }) =>
          setBlockInfo({ ...blockInfo, start: value })
        }
      />
      to{" "}
      <Input
        defaultValue={maxTime}
        onChange={(e, { value }) => setBlockInfo({ ...blockInfo, end: value })}
      />
      , starting at{" "}
      <Input
        label="$"
        onChange={(e, { value }) => setBlockInfo({ ...blockInfo, amt: value })}
      />
      and increasing by{" "}
      <Input
        label="%"
        labelPosition="right"
        onChange={(e, { value }) =>
          setBlockInfo({ ...blockInfo, growth: value })
        }
      />{" "}
      every period.
    </div>
  );
};
export default GGProps;
