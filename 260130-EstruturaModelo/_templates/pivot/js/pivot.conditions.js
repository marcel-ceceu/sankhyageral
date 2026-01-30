(function () {
  window.getPivotConditions = function () {
    return [{
        formula: "#value <= 100000",
        measure: "Sales",
        format: {
          backgroundColor: "#FFFFFF",
          color: "#000000",
          fontFamily: "Tahoma",
          fontSize: "12px"
        }
      },
      {
        formula: "AND(#value > 85000, #value < 60000)",
        measure: "Sales",
        format: {
          backgroundColor: "#FFFFFF",
          color: "#000000",
          fontFamily: "Tahoma",
          fontSize: "12px"
        }
      },
      {
        formula: "AND(#value > 60000, #value < 145000)",
        measure: "Sales",
        format: {
          backgroundColor: "#9ddfd0",
          color: "#000000",
          fontFamily: "Tahoma",
          fontSize: "12px"
        }
      },
      {
        formula: "AND(#value > 145000, #value < 230000)",
        measure: "Sales",
        format: {
          backgroundColor: "#F5E68B",
          color: "#000000",
          fontFamily: "Tahoma",
          fontSize: "12px"
        }
      },
      {
        formula: "AND(#value > 230000, #value < 300001)",
        measure: "Sales",
        format: {
          backgroundColor: "#F5E68B",
          color: "#000000",
          fontFamily: "Tahoma",
          fontSize: "12px"
        }
      },
      {
        formula: "AND(#value > 300000, #value < 500000)",
        measure: "Sales",
        format: {
          backgroundColor: "#6BB6A1",
          color: "#000000",
          fontFamily: "Tahoma",
          fontSize: "12px"
        }
      },
      {
        formula: "#value >= 500000",
        measure: "Sales",
        format: {
          backgroundColor: "#6BB6A1",
          color: "#000000",
          fontFamily: "Tahoma",
          fontSize: "12px"
        }
      }
    ];
  };
})();
