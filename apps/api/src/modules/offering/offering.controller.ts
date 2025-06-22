import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { OfferingService } from './offering.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OFFERING } from '@app/common/utils/paths';
import { Unprotected } from '../../utils/sso/sso.decorators';
import { PushOfferingDto } from '@app/common/dto/offering';
import { DeviceTypeOfferingDto, DeviceTypeOfferingParams, PlatformOfferingDto, PlatformOfferingParams, ProjectRefOfferingDto } from '@app/common/dto/offering/dto/offering.dto';
import { ProjectIdentifierParams } from '@app/common/dto/project-management';

@ApiBearerAuth()
@ApiTags("Catalog - Offering") // Offering
@Controller(OFFERING)
export class OfferingController {
  private readonly logger = new Logger(OfferingController.name);

  constructor(private readonly offeringService: OfferingService) { }

  @Get('platform/:platformIdentifier')
  @ApiOperation({
    summary: "Get Offering of Platform",
    description: "This service message allows retrieval of the offering of a specific platform by platform ID."
  })
  @ApiOkResponse({ type: PlatformOfferingDto })
  getOfferingForPlatform(@Param() params: PlatformOfferingParams) {
    this.logger.debug(`get offering for platform: ${params.platformIdentifier}`)
    return this.offeringService.getOfferingForPlatform(params);
  }


  @Get('device-type/:deviceTypeIdentifier')
  @ApiOperation({
    summary: "Get Offering of Device Type",
    description: "This service message allows retrieval of the offering of a specific device type by device type ID."
  })
  
  @ApiOkResponse({ type: DeviceTypeOfferingDto })
  getOfferingForDeviceType(@Param() params: DeviceTypeOfferingParams) {
    this.logger.debug(`get offering for device type: ${params.deviceTypeIdentifier}`)
    return this.offeringService.getOfferingForDeviceType(params);
  }

  @Get('project/:projectIdentifier')
  @ApiOperation({
    summary: "Get Offering of Project",
    description: "This service message allows retrieval of the offering of a specific project by project identifier."
  })
  @ApiOkResponse({ type: ProjectRefOfferingDto })
  getOfferingForProject(@Param() params: ProjectIdentifierParams) {
    this.logger.debug(`get offering for project: ${params.projectIdentifier}`)
    return this.offeringService.getOfferingForProject(params);
  }


  @Post('push')
  @ApiOperation({ 
    summary: "Push offering of component or map", 
    description: "This service message allows to push component or map by `catalog ID`, to devices or groups of devices" 
  })
  @ApiCreatedResponse()
  pushOffering(@Body() po: PushOfferingDto){
    this.logger.debug(`Push offering of catalogId: ${po.catalogId}, type: ${po.itemType}`)
    this.offeringService.pushOffering(po);
  }

  @Get('checkHealth')
  @Unprotected()
  @ApiExcludeEndpoint()
  checkHealth() {
    this.logger.log("Offering service - Health checking");
    return this.offeringService.checkHealth();
  }

  
}

