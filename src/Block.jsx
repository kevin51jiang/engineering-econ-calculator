import React, { useState, useEffect } from "react";
import { Checkbox } from "semantic-ui-react";
import FactorForms from "./FactorForms";
import AGProps from "./factorForms/AGProps";
import AProps from "./factorForms/AProps";
import GGProps from "./factorForms/GGProps";
import PWProps from "./factorForms/PWProps";
import FWProps from "./factorForms/FWProps";
import randomColor from "randomcolor";
import converter from "./converter";

const Block = ({ block, setBlock, maxTime, interestRate }) => {
  const [blockForm, setBlockForm] = useState("PW");
  const [converted, setConverted] = useState({});
  useEffect(() => {
    let newBlock = {
      amt: "",
      color: `${randomColor()}`,
      hidden: false,
    };

    if (blockForm === "PW") {
      newBlock = {
        ...newBlock,
        form: "PW",
      };
    } else if (blockForm === "FW") {
      newBlock = {
        ...newBlock,
        form: "FW",
        date: 1,
      };
    } else if (blockForm === "A") {
      newBlock = {
        ...newBlock,
        form: "A",
        start: 1,
        end: maxTime,
      };
    } else if (blockForm === "AG") {
      newBlock = {
        ...newBlock,
        form: "AG",
        start: 1,
        end: maxTime,
        increase: "",
      };
    } else if (blockForm === "GG") {
      newBlock = {
        ...newBlock,
        form: "GG",
        start: 1,
        end: maxTime,
        growth: "",
      };
    }

    setBlock(newBlock);
  }, [blockForm]);

  // calculations
  useEffect(() => {
    setConverted(converter({ ...block, interest: interestRate }));
  }, [block, interestRate]);

  return (
    <div
    // style={{
    //   border: `1px solid ${block.color || '#fff'}`,
    // }}
    >
      <span
        style={{ width: "10%", height: "90%", backgroundColor: block.color }}
      >
        Title of cashflow entry
      </span>
      <div>
        I have a{" "}
        <FactorForms
          onChange={(e) => {
            setBlockForm(e);
          }}
        />{" "}
        that has the following properties:
      </div>
      {blockForm === "FW" ? (
        <FWProps maxTime={maxTime} blockInfo={block} setBlockInfo={setBlock} />
      ) : blockForm === "PW" ? (
        <PWProps maxTime={maxTime} blockInfo={block} setBlockInfo={setBlock} />
      ) : blockForm === "A" ? (
        <AProps maxTime={maxTime} blockInfo={block} setBlockInfo={setBlock} />
      ) : blockForm === "AG" ? (
        <AGProps maxTime={maxTime} blockInfo={block} setBlockInfo={setBlock} />
      ) : blockForm === "GG" ? (
        <GGProps maxTime={maxTime} blockInfo={block} setBlockInfo={setBlock} />
      ) : (
        <span>ye done goof</span>
      )}

      <Checkbox
        toggle
        // defaultChecked={true}
        checked={!block.hidden}
        label="Display dataset"
        onChange={(e, { checked }) => setBlock({ ...block, hidden: !checked })}
      />

      <div>
        <h3>Converted</h3>
        {JSON.stringify(converted)}
      </div>
    </div>
  );
};

export default Block;
