export const evaluateSubstanceColor = (option, node, separator) => {
    let color = "110,110,110";

    let value = node["pm2.5"];

    console.log(option,node);

    switch (option) {
      case "초미세먼지":
        value = node["pm2.5"];
        if (value > 75) color = "187,115,115";
        else if (value > 35) color = "215,224,103";
        else if (value > 15) color = "110,176,87";
        else if (value >= 0) color = "125,157,219";
        else color = "110,110,110";
        break;
      case "미세먼지":
        value = node["pm10"];
        if (value > 150) color = "187,115,115";
        else if (value > 80) color = "215,224,103";
        else if (value > 30) color = "110,176,87";
        else if (value >= 0) color = "125,157,219";
        else color = "110,110,110";
        break;
      case "포름알데히드":
        value = node["ch2o"];
        color = "110,110,110";
        break;
      default:
        color = "110,110,110";
    }

    if(separator === "border"){
        return `rgb(${color})`;
    }
    // background 일때
    return `rgb(${color},0.7)`;
  }