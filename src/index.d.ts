export interface TemplateConfig {
  files?: string[];
  postMessage?: string;
}

export interface CliOptions {
  projectName: string;
  templateName: string;
  templatePath: string;
  tartgetPath: string;
  config: TemplateConfig;
}

export interface TemplateData {
  projectPath: string;
  projectName: string;
  organization: string;
  mainBranch: string;
  enableSonarCloud: boolean;
  developmentUrl: string;
  productionUrl: string;
  enableMultiRegion: boolean;
  enableDataDog: boolean;
  dataDogArnEuCentral: string;
  dataDogArnUsEast: string;
  memorySize: number;
  timeout: number;
  minimumCompressionSize: number;
  maxRequestsPerSecond: number;
  maxConcurrentRequests: number;
}
