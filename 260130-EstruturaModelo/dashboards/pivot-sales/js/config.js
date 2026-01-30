(function () {
  var baseReport = window.PIVOT_TEMPLATE_CONFIG
    ? window.PIVOT_TEMPLATE_CONFIG.getBaseReport()
    : {};

  var report = {
    dataSource: {
      data: getData()
    },
    slice: {
      rows: [{
        uniqueName: "Location"
      }],
      columns: [{
          uniqueName: "[Measures]"
        },
        {
          uniqueName: "Order Date"
        }
      ],
      measures: [{
        uniqueName: "Sales",
        aggregation: "sum",
        format: "formatting"
      }]
    },
    conditions: window.getPivotConditions ? window.getPivotConditions() : [],
    formats: [{
      name: "formatting",
      thousandsSeparator: " ",
      decimalSeparator: ".",
      decimalPlaces: 2,
      currencySymbol: "",
      currencySymbolAlign: "left",
      nullValue: "",
      textAlign: "right",
      isPercent: false
    }],
    options: {
      showDefaultSlice: false
    }
  };

  window.PIVOT_CONFIG = {
    container: "wdr-component",
    width: "80%",
    height: 770,
    toolbar: true,
    report: Object.assign({}, baseReport, report)
  };

  function getData() {
    return [{
        "Order Number": {
          type: "number"
        },
        "Quantity": {
          type: "number"
        },
        "Price": {
          type: "number"
        },
        "Order Line Number": {
          type: "number"
        },
        "Sales": {
          type: "number"
        },
        "Order Date": {
          type: "year/quarter/month/day"
        },
        "Status": {
          type: "string"
        },
        "Quarter ": {
          type: "number"
        },
        "Month": {
          type: "number"
        },
        "Year": {
          type: "number"
        },
        "Product Line": {
          type: "string"
        },
        "MSRP": {
          type: "number"
        },
        "Product Code": {
          type: "string"
        },
        "Customer Name": {
          type: "string"
        },
        "Phone": {
          type: "string"
        },
        "Address Line 1": {
          type: "level",
          hierarchy: "Location",
          parent: "City"
        },
        "Address Line 2": {
          type: "string"
        },
        "City": {
          type: "level",
          hierarchy: "Location",
          parent: "Country"
        },
        "State": {
          type: "string"
        },
        "Postal Code": {
          type: "level",
          hierarchy: "Location",
          parent: "Address Line 2"
        },
        "Country": {
          type: "level",
          hierarchy: "Location"
        },
        "Territory": {
          type: "level"
        },
        "Contact Last Name": {
          type: "string"
        },
        "Contact First Name": {
          type: "string"
        },
        "Deal Size": {
          type: "string"
        }
      },
      {
        "Order Number": 10413,
        "Quantity": 49,
        "Price": 100,
        "Order Line Number": 5,
        "Sales": 6896.75,
        "Order Date": "5/5/2018 0:00",
        "Status": "Shipped",
        "Quarter ": 2,
        "Month": 5,
        "Year": 2018,
        "Product Line": "Classic Cars",
        "MSRP": 143,
        "Product Code": "S18_4027",
        "Customer Name": "Gift Depot Inc.",
        "Phone": "2035552570",
        "Address Line 1": "25593 South Bay Ln.",
        "Address Line 2": "",
        "City": "Bridgewater",
        "State": "CT",
        "Postal Code": 97562,
        "Country": "USA",
        "Territory": "NA",
        "Contact Last Name": "King",
        "Contact First Name": "Julie",
        "Deal Size": "Medium"
      },
      {
        "Order Number": 10100,
        "Quantity": 22,
        "Price": 86.51,
        "Order Line Number": 4,
        "Sales": 1903.22,
        "Order Date": "1/6/2016 0:00",
        "Status": "Shipped",
        "Quarter ": 1,
        "Month": 1,
        "Year": 2016,
        "Product Line": "Vintage Cars",
        "MSRP": 92,
        "Product Code": "S18_4409",
        "Customer Name": "Online Diecast Creations Co.",
        "Phone": "6035558647",
        "Address Line 1": "2304 Long Airport Avenue",
        "Address Line 2": "",
        "City": "Nashua",
        "State": "NH",
        "Postal Code": 62018,
        "Country": "USA",
        "Territory": "NA",
        "Contact Last Name": "Young",
        "Contact First Name": "Valarie",
        "Deal Size": "Small"
      },
      {
        "Order Number": 10107,
        "Quantity": 30,
        "Price": 95.7,
        "Order Line Number": 2,
        "Sales": 2871,
        "Order Date": "2/24/2016 0:00",
        "Status": "Shipped",
        "Quarter ": 1,
        "Month": 2,
        "Year": 2016,
        "Product Line": "Motorcycles",
        "MSRP": 95,
        "Product Code": "S10_1678",
        "Customer Name": "Land of Toys Inc.",
        "Phone": "2125557818",
        "Address Line 1": "897 Long Airport Avenue",
        "Address Line 2": "",
        "City": "NYC",
        "State": "NY",
        "Postal Code": 10022,
        "Country": "USA",
        "Territory": "NA",
        "Contact Last Name": "Yu",
        "Contact First Name": "Kwai",
        "Deal Size": "Small"
      },
      {
        "Order Number": 10121,
        "Quantity": 34,
        "Price": 81.35,
        "Order Line Number": 5,
        "Sales": 2765.9,
        "Order Date": "5/7/2016 0:00",
        "Status": "Shipped",
        "Quarter ": 2,
        "Month": 5,
        "Year": 2016,
        "Product Line": "Motorcycles",
        "MSRP": 95,
        "Product Code": "S10_1678",
        "Customer Name": "Reims Collectables",
        "Phone": "26.47.1555",
        "Address Line 1": "59 rue de l'Abbaye",
        "Address Line 2": "",
        "City": "Reims",
        "State": "",
        "Postal Code": 51100,
        "Country": "France",
        "Territory": "EMEA",
        "Contact Last Name": "Henriot",
        "Contact First Name": "Paul",
        "Deal Size": "Small"
      },
      {
        "Order Number": 10134,
        "Quantity": 41,
        "Price": 94.74,
        "Order Line Number": 2,
        "Sales": 3884.34,
        "Order Date": "7/1/2016 0:00",
        "Status": "Shipped",
        "Quarter ": 3,
        "Month": 7,
        "Year": 2016,
        "Product Line": "Motorcycles",
        "MSRP": 95,
        "Product Code": "S10_1678",
        "Customer Name": "Lyon Souveniers",
        "Phone": "+33 1 46 62 7555",
        "Address Line 1": "27 rue du Colonel Pierre Avia",
        "Address Line 2": "",
        "City": "Paris",
        "State": "",
        "Postal Code": 75508,
        "Country": "France",
        "Territory": "EMEA",
        "Contact Last Name": "Da Cunha",
        "Contact First Name": "Daniel",
        "Deal Size": "Medium"
      }
    ];
  }
})();
