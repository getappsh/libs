import { DeliveryStatusEnum, ItemTypeEnum } from "@app/common/database/entities";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DeliveryStatusDto {


  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  catalogId: string;

  /**
   * @description This property might be required in the future.
   * @future -required
   */
  @ApiProperty()
  @IsString()
  @IsOptional()
  // @IsNotEmpty() // Uncomment this in the future when this field becomes mandatory
  itemKey: string = 'gpkg';

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  downloadStop: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  downloadStart: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  downloadDone: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  bitNumber: number;

  @ApiProperty({ required: false })
  @IsOptional()
  downloadSpeed: number;

  @ApiProperty({ required: false })
  @IsOptional()
  downloadData: number;

  @ApiProperty({ required: false, type: "integer", format: "int64" })
  @IsOptional()
  downloadEstimateTime: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  currentTime: Date;

  @ApiProperty({ enum: DeliveryStatusEnum })
  @IsEnum(DeliveryStatusEnum)
  deliveryStatus: DeliveryStatusEnum

  @ApiProperty({ enum: ItemTypeEnum })
  @IsEnum(ItemTypeEnum)
  type: ItemTypeEnum


  toString() {
    return JSON.stringify(this)
  }

}