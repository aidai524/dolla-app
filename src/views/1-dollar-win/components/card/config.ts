const TYPES: Record<string, any> = {
  basic: {
    bg: "bg-[url('/1-dollar-win/card-bg-1.png')]",
    label: {
      text: "BASIC",
      textCls: "text-[#4F4F4F]",
      borderColor: "#434343",
      linearColors: ["#FFFFFF", "#E3E3E3", "#FFFFFF", "#CBCBCB", "#FFFFFF"]
    },
    name: {
      borderColor: "#434343",
      liner1Colors: ["#77B1BF", "#BFFFFF", "#8396B4", "#A2D8FF"],
      liner2Colors: ["#FFFFFF", "#E3E3E3", "#FFFFFF", "#CBCBCB", "#FFFFFF"]
    },
    colors: ["#A7A7A7", "#414141"]
  },
  redOg: {
    bg: "bg-[url('/1-dollar-win/card-bg-2.png')]",
    label: {
      text: "RED OG",
      textCls: "text-[#4C1167]",
      borderColor: "#8C4ECA",
      linearColors: ["#ECDDFF", "#CBBBFF", "#ECDDFF", "#CBBBFF", "#ECDDFF"]
    },
    name: {
      borderColor: "#8C4ECA",
      liner1Colors: ["#9050E4", "#F1E7FF", "#9050E4", "#612EA5"],
      liner2Colors: ["#F6EFFF", "#EFDBFF", "#FFFFFF", "#EDD7FF", "#F6F0FF"]
    },
    colors: ["#8F54CE", "#572CB5"]
  },
  saudi: {
    bg: "bg-[url('/1-dollar-win/card-bg-3.png')]",
    label: {
      text: "SAUDI",
      textCls: "text-[#674911]",
      borderColor: "#CA9F4E",
      linearColors: ["#FBFFDD", "#FFE69A", "#FFFFF1", "#FFE484", "#FDFFB5"]
    },
    name: {
      borderColor: "#D19C38",
      liner1Colors: ["#E4AE6D", "#FFF1BF", "#D9B430", "#A96806"],
      liner2Colors: ["#FBFFDD", "#FFE69A", "#FFFFF1", "#FFE484", "#FDFFB5"]
    },
    colors: ["#CEA354", "#C79A47"]
  }
};

export default TYPES;
