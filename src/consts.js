export const factorForms = [
  {
    key: "FW",
    text: "(F) Future Worth",
    value: "FW",
  },
  {
    key: "PW",
    text: "(P) Present Worth",
    value: "PW",
  },
  {
    key: "A",
    text: "(A) Annuity",
    value: "A",
  },
  {
    key: "AG",
    text: "(G) Arithmetic Gradient",
    value: "AG",
  },
  {
    key: "GG",
    text: "(none) Geometric Gradient",
    value: "GG",
  },
];

export const factorFormResults = factorForms.filter((val) =>
  // ["FW", "PW", "A"].includes(val.key)
  ["PW"].includes(val.key)
);

export const chartOptions = {
  maintainAspectRatio: false,
  title: {
    display: true,
    text: "Cashflow diagram",
  },
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          // beginAtZero: true,
          suggestedMin: -10,
          suggestedMax: 20,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};
