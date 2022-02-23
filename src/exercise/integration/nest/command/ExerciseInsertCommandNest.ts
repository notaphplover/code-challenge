import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ExerciseInsertCommandNest {
  @IsString()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  @MaxLength(100)
  public content!: string;

  @IsString()
  @IsNotEmpty()
  public userId!: string;
}
