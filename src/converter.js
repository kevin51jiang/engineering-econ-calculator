// formulas from
// https://staff.emu.edu.tr/gokhanizbirak/Documents/courses/ieng323-mane323/assignments-homeworks/Formulas-Engineering-Economy.pdf

const AGivenF = (data) => {
  return data.interest / (Math.pow(1 + data.interest, data.date) - 1);
};
const FGivenA = (data) => 1 / AGivenF(data);

const AGivenP = (data) => {
  const nthPaymentReciprocal = Math.pow(
    1 + data.interest,
    data.end - data.start
  );
  return (data.interest * nthPaymentReciprocal) / (nthPaymentReciprocal - 1);
};

const PGivenA = (data) => 1 / AGivenP(data);

const FGivenP = (data) => {
  return Math.pow(1 + data.interest, data.date);
};

const PGivenF = (data) => 1 / FGivenP(data);

const PGivenGG = (data) => PGivenA(data) / (1 + data.growth);

const PGivenAG = ({ amt, start, end, increase, interest }) => {
  const n = end - start;
  return (
    (increase * (Math.pow(1 + interest, n) - interest * n - 1)) /
    (Math.pow(interest, 2) * Math.pow(1 + interest, n))
  );
};

const AGivenAG = (data) => {
  return (
    1 / data.interest -
    data.periods / (Math.pow(1 + data.interest, data.periods) - 1)
  );
};

// probably won't be supported for a while
const PGivenAInfinite = (data) => data.annuity / data.interest;

const convertToP = (data) => {
  let res;
  switch (data.form) {
    case "A":
      res = PGivenA(data);
      break;
    case "F":
      res = PGivenF(data);
      break;
    case "AG":
      res = PGivenGG(data);
      break;
    case "P":
      res = data;
      break;
  }

  if (!res) {
    throw `Invalid form of: ${data.form}`;
  }

  // make sure that they only have p attributes
  return { ...data, form: "P", factor: res };
};

/**
 * Old, req should show the stuff changing.
 * Req should only show the attributes that need to change e.g. period.
 */
const converter = (data, changesToMake) => {
  // data should include:
  // amt
  // form
  // interest rate
  // growth
  // periods
  // start
  // end
  // annuity (1)
  const convertable = { ...data, interest: data.interest / 100 };

  // Currently, assume that everything will needed to be converted to present value
  switch (convertable.form) {
    case "PW":
      // nothing needs to change for stuff that's already PW
      return { data: convertable, steps: [] };
    case "FW":
      // need to calculate conversion factor, then apply
      const fwFactor = PGivenF(convertable);
      console.log("fwFactor", fwFactor);
      return {
        data: {
          // this datapoint will keep getting mutated every step
          amt: fwFactor * convertable.amt,
        },
        steps: [
          // insert a new "step" in the array every time a new conversion op is done
          {
            name: "(P/F, i, n)", // to look up formula later for display
            factor: fwFactor, // for final result
            data: convertable, // for snapshot in time
          },
        ],
      };

    case "A":
      // need to calculate conversion factor, then apply
      const aFactor = PGivenA(convertable);
      return {
        data: {
          amt: aFactor * convertable.amt,
        },
        steps: [
          {
            name: "(P/A, i, n)", // to look up formula later for display
            factor: aFactor, // for final result
            data: convertable, // for snapshot in time
          },
        ],
      };
    case "AG":
      // need to calculate conversion factor, then apply
      const agFactor = PGivenAG(convertable);
      return {
        data: {
          amt: agFactor * convertable.amt,
        },
        steps: [
          {
            name: "(P/G, i, n)", // to look up formula later for display
            factor: agFactor, // for final result
            data: convertable, // for snapshot in time
          },
        ],
      };
    case "GG":
      // need to calculate conversion factor, then apply
      const ggFactor = PGivenGG(convertable);
      return {
        data: {
          amt: ggFactor * convertable.amt,
        },
        steps: [
          {
            name: "(P/G, g, i, n)", // to look up formula later for display
            factor: ggFactor, // for final result
            data: convertable, // for snapshot in time
          },
        ],
      };
  }
};

export default converter;
