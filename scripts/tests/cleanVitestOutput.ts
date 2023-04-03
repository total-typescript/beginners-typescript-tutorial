import path from "path";

export const cleanVitestOutput = (
  result: string,
  context: {
    rootFolder: string;
  },
) => {
  const asJson: {
    startTime?: number;
    endTime?: number;
    duration?: number;
    numFailedTestSuites?: number;
    numFailedTests?: number;
    numPassedTestSuites?: number;
    numPassedTests?: number;
    numPendingTestSuites?: number;
    numPendingTests?: number;
    numTodoTests?: number;
    numTotalTestSuites?: number;
    numTotalTests?: number;
    testResults: {
      name: string;
      startTime?: number;
      endTime?: number;
      duration?: number;
      assertionResults: {
        duration?: number;
      }[];
    }[];
  } = JSON.parse(result.slice(1, -1));

  delete asJson.startTime;
  delete asJson.endTime;
  delete asJson.duration;
  delete asJson.numFailedTestSuites;
  delete asJson.numFailedTests;
  delete asJson.numPassedTestSuites;
  delete asJson.numPassedTests;
  delete asJson.numPendingTestSuites;
  delete asJson.numPendingTests;
  delete asJson.numTodoTests;
  delete asJson.numTotalTestSuites;
  delete asJson.numTotalTests;

  asJson.testResults.forEach((testResult) => {
    delete testResult.startTime;
    delete testResult.endTime;
    delete testResult.duration;

    testResult.name = path.relative(context.rootFolder, testResult.name);

    testResult.assertionResults.forEach((assertionResult) => {
      delete assertionResult.duration;
    });
  });

  asJson.testResults.sort((a, b) => a.name.localeCompare(b.name));

  return asJson;
};
