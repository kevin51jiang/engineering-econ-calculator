const AGivenF = (data) => {
  return data.interest / (Math.pow(1 + data.interest, data.periods) - 1);
};
const FGivenA = (data) => 1 / AGivenF(data);

const AGivenP = (data) => {
  const nthPaymentReciprocal = Math.pow(1 + data.interest, data.periods);
  return (data.interest * nthPaymentReciprocal) / (nthPaymentReciprocal - 1);
};

const PGivenA = (data) => 1 / AGivenP(data);

const FGivenP = (data) => {
  return Math.pow(1 + data.interest, data.periods);
};

const PGivenF = (data) => 1 / FGivenP(data);

const PGivenGG = (data) => PGivenA(data) / (1 + data.growth);

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

  // Currently, assume that everything will needed to be converted to present value
  switch (data.form) {
    case "PW":
      // nothing needs to change for stuff that's already PW
      return { data: data, steps: [] };
    case "FW":
      // need to calculate conversion factor, then apply
      const factor = PGivenF(data);
      return {
        data: {
          amt: factor * data.amt,
        },
        steps: [
          {
            name: "P/F", // to look up formula later for display
            factor: factor, // for final result
            data: data, // for snapshot in time
          },
        ],
      };
      break;
    case "A":
      // need to calculate conversion factor, then apply
      break;
    case "AG":
      // need to calculate conversion factor, then apply
      break;
    case "GG":
      // need to calculate conversion factor, then apply
      break;
  }
};

export default converter;
