export interface DotGameLogInterface {
  log(message: any, ...optionalParams: any[]): void;
  info(message: any, ...optionalParams: any[]): void;
  error(message: any, ...optionalParams: any[]): void;
  warn(message: any, ...optionalParams: any[]): void;
  debug(message: any, ...optionalParams: any[]): void;
}

/**
 * DotGame Logger
 */
export class DotGameLog {
  private static logger: DotGameLogInterface = console;

  static setLogger(logger: any) {
    DotGameLog.logger = logger;
  }

  static log(message: any, ...optionalParams: any[]) {
    DotGameLog.logger.log(message, ...optionalParams);
  }

  static info(message: any, ...optionalParams: any[]) {
    DotGameLog.logger.info(message, ...optionalParams);
  }

  static error(message: any, ...optionalParams: any[]) {
    DotGameLog.logger.error(message, ...optionalParams);
  }

  static warn(message: any, ...optionalParams: any[]) {
    DotGameLog.logger.warn(message, ...optionalParams);
  }

  static debug(message: any, ...optionalParams: any[]) {
    DotGameLog.logger.debug(message, ...optionalParams);
  }
}
