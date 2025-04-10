import { RegulationStatusEntity } from "@app/common/database/entities";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RegulationStatusParams {
  @ApiProperty({ description: 'ID of the Project' })
  @IsNumber()
  @Type(() => Number)
  projectId: number

  @ApiProperty({ description: 'Component Version of the regulation' })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  versionId: string


  @ApiProperty({ description: 'ID of the regulation' })
  @IsNumber()
  @Type(() => Number)
  regulationId: number
}

export class VersionRegulationStatusParams {
  @ApiProperty({ description: 'ID of the Project' })
  @IsNumber()
  @Type(() => Number)
  projectId: number

  @ApiProperty({ description: 'Component Version of the regulation' })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  versionId: string

}

export class SetRegulationStatusDto{

  projectId: number

  regulationId: number

  versionId: string

  @ApiProperty({ description: 'Value of the regulation' })
  @IsString()
  @IsNotEmpty()
  value: string

  @ApiProperty({ required: false,  description: 'Report Details of the regulation' })
  @IsString()
  @IsOptional()
  reportDetails?: string

}

export class  SetRegulationCompliancyDto {

  projectId: number

  regulationId: number

  versionId: string

  @ApiProperty({ description: 'Compliancy of the regulation' })
  @IsBoolean()
  isCompliant: boolean
}


export class RegulationStatusDto  extends RegulationStatusParams{

  @ApiProperty({ description: 'Value of the regulation' })
  value: string

  @ApiProperty({ required: false,  description: 'Report Details of the regulation' })
  reportDetails?: string


  @ApiProperty({ description: 'Compliancy of the regulation' })
  isCompliant: boolean


  fromRegulationStatusEntity(regulationStatus: RegulationStatusEntity) {
    this.value = regulationStatus.value
    this.reportDetails = regulationStatus.reportDetails
    this.isCompliant = regulationStatus.isCompliant
    this.versionId = regulationStatus?.version?.catalogId
    this.regulationId = regulationStatus?.regulation?.id
    this.projectId = regulationStatus?.regulation?.project?.id

    return this

  }
}