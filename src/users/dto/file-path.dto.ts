import { IsNotEmpty, IsString } from 'class-validator';
export default class FilePath {
  @IsString()
  @IsNotEmpty()
  path: string;
}
