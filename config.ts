const getEnvironmentVariable = (environmentVariable: string): string => {
  console.log(process.env);
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  return String(unvalidatedEnvironmentVariable);
};

export const config = {
  url: getEnvironmentVariable('NEXTAUTH_URL'),
};
