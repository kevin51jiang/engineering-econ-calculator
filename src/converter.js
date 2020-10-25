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
    case 'A':
      res = PGivenA(data)
      break;
    case 'F':
      res = PGivenF(data)
      break;
    case 'AG':
      res = PGivenGG(data)
      break;
    case P:
      res = data;
      break;
  }

  if (!res) {
    throw `Invalid form of: ${data.form}`
  }

  // make sure that they only have p attributes
  return { ...data, form: 'P', factor: res }
}

/** 
 * Old, req should show the stuff changing.
 * Req should only show the attributes that need to change e.g. period.
 */
export default convertForms = (data, changesToMake) => {
  // data should include:
  // form
  // interest rate
  // growth
  // periods
  // start
  // end
  // annuity (1)
    
  //   //in order to change, might need to change period first
  //   //in order to change period, will need to convert to present
  // if (changesToMake.form) {
  //   // in order to change form, need to change period first
  //   // in order to change period, convert to present
  //   let converted = [...data];
  //   if (data.start !== 0 || data.end !== periods) {
  //     converted = 
  //   }
  // }
  
  
  // look for what to change first
  
};
