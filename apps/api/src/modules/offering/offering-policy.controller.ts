import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OFFERING } from '@app/common/utils/paths';
import { CreateOfferingTreePolicyDto, UpdateOfferingTreePolicyDto, OfferingTreePolicyDto, OfferingTreePolicyParams} from '@app/common/dto/offering';
import { OfferingService } from './offering.service';

@ApiTags("Catalog - Offering Policy")
@ApiBearerAuth()
@Controller(`${OFFERING}/policy`)
export class OfferingPolicyController {
  private readonly logger = new Logger(OfferingPolicyController.name);

  constructor(private readonly offeringService: OfferingService) {}

  @Post()
  @ApiOperation({
    summary: "Create Offering Tree Policy",
    description: "Creates a new policy for managing offering tree policy."
  })
  @ApiOkResponse({ type: OfferingTreePolicyDto })
  create(@Body() createDto: CreateOfferingTreePolicyDto) {
    this.logger.debug(`Creating policy: ${JSON.stringify(createDto)}`);
    return this.offeringService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get Offering tree Policies",
    description: "Retrieves all offering tree policy. Filter by platform, device-type and project."
  })
  @ApiOkResponse({ type: [OfferingTreePolicyDto] })
  findByProject(@Query() params: OfferingTreePolicyParams) {
    this.logger.debug(`Getting offering policies for: ${JSON.stringify(params)}`);
    return this.offeringService.findByProject(params);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Update Offering Tree Policy",
    description: "Updates an existing offering tree policy."
  })
  @ApiOkResponse({ type: OfferingTreePolicyDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateOfferingTreePolicyDto
  ) {
    this.logger.debug(`Updating policy: ${id}`);
    return this.offeringService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete Offering Tree Policy",
    description: "Deletes a offering tree policy."
  })
  @ApiOkResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.debug(`Deleting policy: ${id}`);
    return this.offeringService.remove(id);
  }
}
