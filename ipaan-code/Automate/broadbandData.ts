const broadbandData = [
  {
    rank: 1,
    country: "Sudan",
    average: "1367.0",
    cheapest: "499.0",
    expensive: "2565.0",
    currency: "SDG"
  },
  {
    rank: 5,
    country: "Egypt",
    average: "398.80000000000007",
    cheapest: "120.0",
    expensive: "1140.0",
    currency: "EGP"
  },
  {
    rank: 11,
    country: "Zimbabwe",
    average: "3105.0",
    cheapest: "2425.0",
    expensive: "4058.0",
    currency: "ZWL"
  },
  {
    rank: 20,
    country: "Republic of Congo",
    average: "35000.0",
    cheapest: "25416.666666666668",
    expensive: "45416.666666666664",
    currency: "CDF"
  },
  {
    rank: 23,
    country: "Tunisia",
    average: "47.224999999999994",
    cheapest: "21.012",
    expensive: "115.90000000000002",
    currency: "TND"
  },
  {
    rank: 29,
    country: "Eswatini",
    average: "295.6666666666667",
    cheapest: "161.66666666666666",
    expensive: "495.6666666666667",
    currency: "SZL"
  },
  {
    rank: 40,
    country: "Ethiopia",
    average: "1055.4166666666667",
    cheapest: "671.4166666666666",
    expensive: "3567.4166666666665",
    currency: "ETB"
  },
  {
    rank: 42,
    country: "Libya",
    average: "92.5",
    cheapest: "45.0",
    expensive: "350.0",
    currency: "LYD"
  },
  {
    rank: 47,
    country: "Algeria",
    average: "2799.0",
    cheapest: "1600.0",
    expensive: "3999.0",
    currency: "DZD"
  },
  {
    rank: 51,
    country: "Nigeria",
    average: "30457.5",
    cheapest: "12795.0",
    expensive: "338610.0",
    currency: "NGN"
  },
  {
    rank: 55,
    country: "Liberia",
    average: "24.0",
    cheapest: "9.0",
    expensive: "59.0",
    currency: "USD"
  },
  {
    rank: 67,
    country: "Mayotte",
    average: "26.5",
    cheapest: "26.5",
    expensive: "26.5",
    currency: "EUR"
  },
  {
    rank: 72,
    country: "Mauritius",
    average: "1450.0",
    cheapest: "799.0",
    expensive: "4700.0",
    currency: "MUR"
  },
  {
    rank: 85,
    country: "Togo",
    average: "21041.666666666664",
    cheapest: "15833.333333333334",
    expensive: "30833.333333333332",
    currency: "XOF"
  },
  {
    rank: 87,
    country: "Morocco",
    average: "349.0",
    cheapest: "130.58333333333334",
    expensive: "1016.6666666666666",
    currency: "MAD"
  },
  {
    rank: 100,
    country: "Senegal",
    average: "24400.0",
    cheapest: "12900.0",
    expensive: "54900.0",
    currency: "XOF"
  },
  {
    rank: 104,
    country: "Réunion",
    average: "38.083333333333336",
    cheapest: "18.99",
    expensive: "63.9",
    currency: "EUR"
  },
  {
    rank: 105,
    country: "Côte d'Ivoire",
    average: "25000.0",
    cheapest: "15000.0",
    expensive: "85000.0",
    currency: "XOF"
  },
  {
    rank: 106,
    country: "Mali",
    average: "25000.0",
    cheapest: "15000.0",
    expensive: "60000.0",
    currency: "XOF"
  },
  {
    rank: 111,
    country: "Rwanda",
    average: "55416.16666666667",
    cheapest: "25833.333333333332",
    expensive: "199999.0",
    currency: "RWF"
  },
  {
    rank: 113,
    country: "Tanzania",
    average: "112500.0",
    cheapest: "50000.0",
    expensive: "265666.6666666667",
    currency: "TZS"
  },
  {
    rank: 115,
    country: "Cape Verde",
    average: "4550.0",
    cheapest: "749.0",
    expensive: "4550.0",
    currency: "CVE"
  },
  {
    rank: 116,
    country: "Zambia",
    average: "1199.0",
    cheapest: "510.0",
    expensive: "2250.0",
    currency: "ZMK"
  },
  {
    rank: 117,
    country: "Burkina Faso",
    average: "27400.0",
    cheapest: "14750.0",
    expensive: "156150.0",
    currency: "XOF"
  },
  {
    rank: 124,
    country: "Angola",
    average: "39751.6",
    cheapest: "19651.600000000002",
    expensive: "131901.78125",
    currency: "AOA"
  },
  {
    rank: 125,
    country: "Kenya",
    average: "6299.0",
    cheapest: "2395.0",
    expensive: "20000.0",
    currency: "KES"
  },
  {
    rank: 127,
    country: "South Africa",
    average: "899.0",
    cheapest: "215.0",
    expensive: "1880.0",
    currency: "ZAR"
  },
  {
    rank: 131,
    country: "Uganda",
    average: "199500.0",
    cheapest: "112000.0",
    expensive: "559000.0",
    currency: "UGX"
  },
  {
    rank: 135,
    country: "Somalia",
    average: "54.58333333333333",
    cheapest: "24.166666666666668",
    expensive: "304.1666666666667",
    currency: "USD"
  },
  {
    rank: 136,
    country: "Benin",
    average: "33750.0",
    cheapest: "16250.0",
    expensive: "71250.0",
    currency: "XOF"
  },
  {
    rank: 139,
    country: "Madagascar",
    average: "249000.0",
    cheapest: "249000.0",
    expensive: "249000.0",
    currency: "MGA"
  },
  {
    rank: 140,
    country: "Cameroon",
    average: "34833.333333333336",
    cheapest: "14900.0",
    expensive: "58833.333333333336",
    currency: "XAF"
  },
  {
    rank: 141,
    country: "Ghana",
    average: "786.75",
    cheapest: "257.0",
    expensive: "4042.5",
    currency: "GHS"
  },
  {
    rank: 142,
    country: "Namibia",
    average: "1074.0041666666666",
    cheapest: "430.0041666666668",
    expensive: "4140.0",
    currency: "NAD"
  },
  {
    rank: 157,
    country: "Mauritania",
    average: "2608.3333333333335",
    cheapest: "1208.3333333333333",
    expensive: "5008.333333333333",
    currency: "MRO"
  },
  {
    rank: 160,
    country: "Saint Helena",
    average: "53.83166666666666",
    cheapest: "16.307666666666666",
    expensive: "177.73666666666668",
    currency: "SHP"
  },
  {
    rank: 164,
    country: "Botswana",
    average: "975.0",
    cheapest: "329.0",
    expensive: "3418.86",
    currency: "BWP"
  },
  {
    rank: 166,
    country: "Equatorial Guinea",
    average: "42500.0",
    cheapest: "20000.0",
    expensive: "122000.0",
    currency: "XAF"
  },
  {
    rank: 171,
    country: "Sierra Leone",
    average: "1491666.6666666667",
    cheapest: "500000.0",
    expensive: "3094166.6666666665",
    currency: "SLL"
  },
  {
    rank: 175,
    country: "Gabon",
    average: "47708.33333333333",
    cheapest: "27500.0",
    expensive: "152916.66666666666",
    currency: "XOF"
  },
  {
    rank: 177,
    country: "Niger",
    average: "50000.0",
    cheapest: "27500.0",
    expensive: "72500.0",
    currency: "XOF"
  },
  {
    rank: 184,
    country: "Djibouti",
    average: "15161.666666666668",
    cheapest: "4766.666666666667",
    expensive: "30011.666666666668",
    currency: "DJF"
  },
  {
    rank: 187,
    country: "Lesotho",
    average: "1599.0",
    cheapest: "649.0",
    expensive: "8999.0",
    currency: "LSL"
  },
  {
    rank: 189,
    country: "Gambia",
    average: "5916.666666666667",
    cheapest: "2916.6666666666665",
    expensive: "7916.666666666667",
    currency: "GMD"
  },
  {
    rank: 198,
    country: "Comoros",
    average: "44333.333333333336",
    cheapest: "15833.333333333334",
    expensive: "88333.33333333333",
    currency: "KMF"
  },
  {
    rank: 203,
    country: "Seychelles",
    average: "1493.8499999999997",
    cheapest: "171.35",
    expensive: "8619.0",
    currency: "SCR"
  },
  {
    rank: 206,
    country: "Eritrea",
    average: "1750.0",
    cheapest: "316.0",
    expensive: "4000.0",
    currency: "ERN"
  },
  {
    rank: 208,
    country: "Mozambique",
    average: "7550.0",
    cheapest: "2800.0",
    expensive: "15300.0",
    currency: "MZN"
  },
  {
    rank: 218,
    country: "Congo (Democratic Republic of)",
    average: "474240.0",
    cheapest: "249600.0",
    expensive: "686400.0",
    currency: "CDF"
  },
  {
    rank: 222,
    country: "Burundi",
    average: "869769.4033333333",
    cheapest: "110000.0",
    expensive: "3591666.6666666665",
    currency: "BIF"
  },
];

export default broadbandData;
