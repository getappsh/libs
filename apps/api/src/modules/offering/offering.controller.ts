import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { OfferingService } from './offering.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OFFERING } from '@app/common/utils/paths';
import { Unprotected } from '../../utils/sso/sso.decorators';
import { PushOfferingDto } from '@app/common/dto/offering';
import { ComponentV2Dto } from '@app/common/dto/upload';

@ApiBearerAuth()
@ApiTags("Offering")
@Controller(OFFERING)
export class OfferingController {
  private readonly logger = new Logger(OfferingController.name);

  constructor(private readonly offeringService: OfferingService) { }

  @Get("component/:catalogId")
  @ApiOperation({ 
    summary: "Get Offering of Component", 
    description: "This service message allows retrieval of the offering of a specific component by catalog ID." 
  })
  @ApiOkResponse({ type: ComponentV2Dto })
  getOfferingOfComp(@Param("catalogId") catalogId: string) {
    this.logger.debug(`get offering of ${catalogId}`);
    return this.offeringService.getOfferingOfComp(catalogId);
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

