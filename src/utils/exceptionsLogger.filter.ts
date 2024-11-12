import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(
      '🚀 ~ ExceptionsLoggerFilter ~ exception thrown:',
      JSON.stringify(exception),
    );
    super.catch(exception, host);
  }
}
export default ExceptionsLoggerFilter;
