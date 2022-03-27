const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  return String(unvalidatedEnvironmentVariable);
};

export const config = {
  url: getEnvironmentVariable('NEXTAUTH_URL'),
};
