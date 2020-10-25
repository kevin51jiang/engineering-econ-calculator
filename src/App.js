import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import FactorForms from "./FactorForms";
import Block from "./Block";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "./App.css";
import { Button, Dropdown, Header, Input, Segment } from "semantic-ui-react";
import { Bar } from "react-chartjs-2";
import randomColor from "randomcolor";

import { factorFormResults, chartOptions } from "./consts";

function App() {
  const [interestRate, setInterestRate] = useState(12);
  const [isInterestError, setIsInterestError] = useState(false);
  const [timePeriod, setTimePeriod] = useState(8);
  const [numBlocks, setNumBlocks] = useState(1);
  const [blocks, setBlocks] = useState([]);
  const [reqForm, setReqForm] = useState(factorFormResults[0].value);
  const [chartData, setChartData] = useState({
    labels: ["0", "1"],
    datasets: [],
  });

  const chartRef = useRef();

  useEffect(() => {
    if (numBlocks > blocks.length) {
      console.log("blocks.length", blocks.length);
      console.log("numBlocks", numBlocks);
      let temp = [...blocks];
      temp.length = numBlocks;
      temp.fill({}, blocks.length, numBlocks);
      setBlocks(temp);
    } else if (numBlocks < blocks.length) {
      let temp = [...blocks];
      temp.length = numBlocks;
      setBlocks(temp);
    }
  }, [numBlocks]);

  useEffect(() => {
    // array of datasets
    let newData = [];

    blocks.map((block, ind) => {
      const defaultBlockOptions = {
        backgroundColor: block?.color || `${randomColor()}`,
        hidden: block.hidden,
      };

      if (block.form === "FW") {
        // future worth dataset
        // [0, 0, ... , amt, ..., 0]
        newData.push({
          ...defaultBlockOptions,
          label: `Future worth: ${ind + 1}`,
          data: ((block) => {
            let empty = Array(timePeriod + 1).fill(0);
            empty[block?.date] = block?.amt;
            return empty;
          })(block),
        });
      } else if (block.form === "PW") {
        // present worth dataset
        newData.push({
          ...defaultBlockOptions,
          label: `Present worth: ${ind + 1}`,
          // [amt, 0, 0, ...]
          data: ((block) => {
            let empty = Array(timePeriod + 1).fill(0);
            empty[0] = block?.amt;
            return empty;
          })(block),
        });
      } else if (block.form === "A") {
        // annuity dataset
        newData.push({
          ...defaultBlockOptions,
          label: `Annuity: ${ind + 1}`,
          // [0, amt, amt, amt, ...]
          data: ((block) => {
            let empty = Array(timePeriod + 1).fill(block?.amt || 0);
            empty[0] = 0;
            return empty;
          })(block),
        });
      } else if (block.form === "AG") {
        // arith grad dataset
        newData.push({
          ...defaultBlockOptions,
          label: `Arithmetic gradient: ${ind + 1}`,
          // [0, ..., 0, amt, amt + increase, amt + 2* increase, ...]
          data: ((block) => {
            // create just the [amt, amt + increase, ... ] part
            const interestingPart = Array(block?.end - block?.start)
              .fill(0)
              .map(
                (_, ind) =>
                  Number(block?.amt) + ind * Number(block?.increase) || 0
              );

            // pad it with 0s on either side as needed
            return Array(Number(block?.start))
              .fill(0)
              .concat(interestingPart)
              .concat(Array(timePeriod - block.end).fill(0));
          })(block),
        });
      } else if (block.form === "GG") {
        // geometric gradient dataset
        newData.push({
          ...defaultBlockOptions,
          label: `Geometric gradient: ${ind + 1}`,
          // [0, amt, amt * (1+growth)^1, amt * (1+growth)^2, ...]
          data: ((block) => {
            // create just the [ amt, amt * (1+growth)^1, amt * (1+growth)^2] part
            const interestingPart = Array(block?.end - block?.start)
              .fill(0)
              .map(
                (_, ind) =>
                  Number(block?.amt) *
                    Math.pow(1 + Number(block?.growth) / 100, ind) || 0
              );

            // pad it with 0s on either side as needed
            return Array(Number(block?.start))
              .fill(0)
              .concat(interestingPart)
              .concat(Array(timePeriod - block.end).fill(0));
          })(block),
        });
      }
    });

    setChartData({
      // adjust length to 0 to n, inclusive on both ends
      labels: [...Array(timePeriod).keys(), timePeriod],
      datasets: newData,
    });
  }, [blocks, timePeriod]);

  return (
    <div className="App">
      <Header as="h1">Engineering Econ Calculator</Header>

      <div>
        Interest rate (MARR or inflation or whatever):{" "}
        <Input
          label={{ basic: true, content: "%" }}
          labelPosition="right"
          placeholder="Enter interest rate..."
          value={interestRate}
          onChange={(e) => {
            setInterestRate(e.target.value);
            if (isFinite(e.target.value)) {
              setIsInterestError(false);
            } else {
              setIsInterestError(true);
            }
          }}
          error={isInterestError}
        />{" "}
      </div>
      <div>
        Number of periods:{" "}
        <Input
          placeholder="Enter number of periods"
          onChange={(e) => setTimePeriod(Number(e.target.value))}
          value={timePeriod}
        />{" "}
      </div>
      <hr />
      <span>
        My ending answer should be in{" "}
        <Dropdown
          inline
          options={factorFormResults}
          defaultValue={factorFormResults[0].value}
          onChange={(e, { value }) => setReqForm(value)}
          error={reqForm === "FW"}
        />
        .
        {reqForm === "FW" && (
          <div>Sorry, currently not supported in this version.</div>
        )}
      </span>

      <hr />
      <div>
        <Button onClick={() => setNumBlocks(numBlocks + 1)}>+</Button>
        <Button onClick={() => numBlocks > 1 && setNumBlocks(numBlocks - 1)}>
          -
        </Button>
        <span> {numBlocks}</span>
      </div>

      <Segment.Group>
        {blocks.map((block, ind) => (
          <Segment>
            <Block
              maxTime={timePeriod}
              desired={reqForm}
              block={block}
              setBlock={(newBlock) => {
                let items = [...blocks];
                items[ind] = newBlock;
                setBlocks(items);
              }}
            />
          </Segment>
        ))}
      </Segment.Group>

      <div style={{ width: "640px", height: "360px" }}>
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default App;
