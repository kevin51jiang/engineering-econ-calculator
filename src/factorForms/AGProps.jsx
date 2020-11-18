import React from "react";
import { Input } from "semantic-ui-react";

const AGProps = ({ maxTime, blockInfo, setBlockInfo }) => {
  return (
    <div>
      A linear gradient, starting at period{" "}
      <Input
        error={blockInfo.start < 0 || blockInfo.start > blockInfo.end}
        defaultValue="1"
        onChange={(e, { value }) =>
          setBlockInfo({ ...blockInfo, start: value })
        }
      />{" "}
      to{" "}
      <Input
        error={blockInfo.end > maxTime || blockInfo.start > blockInfo.end}
        defaultValue={maxTime}
        onChange={(e, { value }) => setBlockInfo({ ...blockInfo, end: value })}
      />
      , starting at{" "}
      <Input
        label="$"
        onChange={(e, { value }) => setBlockInfo({ ...blockInfo, amt: value })}
      />
      increasing by{" "}
      <Input
        label="$"
        onChange={(e, { value }) =>
          setBlockInfo({ ...blockInfo, increase: value })
        }
      />{" "}
      every period.
    </div>
  );
};

export default AGProps;
