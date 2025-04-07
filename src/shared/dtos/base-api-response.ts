import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseApiResponse<T> {
  public data: T; // Swagger Decorator is added in the extended class below, since that will override this one.

  @ApiProperty({ type: Object })
  public meta: any;
}

export class BaseResponse {
  @Expose()
  @ApiProperty()
  id?: string;

  @Expose()
  @ApiProperty()
  message?: string;

  @Expose()
  @ApiPropertyOptional()
  data?: any;
}
