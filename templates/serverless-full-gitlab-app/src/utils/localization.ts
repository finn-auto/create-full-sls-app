import { Country, Region } from "./constants";

const getCountryFromAWSRegion = (): Country => {
  const aws_region = (process.env.AWS_REGION || Region.EU).toLocaleLowerCase();
  if (aws_region.startsWith("us")) {
    return Country.US;
  }
  return Country.DE;
};

export const getCountry = (requestHeaderValue: string | undefined): Country => {
  if (!requestHeaderValue) {
    return Country.DE;
  }

  let region;

  if (requestHeaderValue.includes("-")) {
    region = requestHeaderValue.split("-")[1].toLocaleLowerCase();
  } else if (requestHeaderValue.includes("_")) {
    region = requestHeaderValue.split("_")[1].toLocaleLowerCase();
  }

  if (!region) {
    return getCountryFromAWSRegion();
  }

  if (region === "us") {
    return Country.US;
  }

  return Country.DE;
};
