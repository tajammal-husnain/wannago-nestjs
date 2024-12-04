import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(
      `🤣 ~ file: exceptionsLogger.filter.ts:6 ~ ExceptionsLoggerFilter ~ exception:`,
      exception,
    );
    super.catch(exception, host);
  }
}
export default ExceptionsLoggerFilter;
