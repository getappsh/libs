import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { HierarchyService } from "./hierarchy.service";
import { DeviceTypeDto, CreateDeviceTypeDto, DeviceTypeParams, UpdateDeviceTypeDto } from "@app/common/dto/devices-hierarchy";


@ApiTags("Device - Hierarchy")
@ApiBearerAuth()
@Controller("device/hierarchy")
export class HierarchyController {
  private readonly logger = new Logger(HierarchyController.name);

  constructor(private readonly hierarchyService: HierarchyService) {}

    @Get('/device-types')
    @ApiOperation({ summary: 'Get all device types' })
    @ApiOkResponse({ type: DeviceTypeDto, isArray: true })
    @ApiQuery({ name: 'query', required: false, description: 'Query to search device types', type: String })
    getDeviceTypes(@Query('query') query?: string) {
      this.logger.debug(`Getting all device types with query: ${query}`);
      return this.hierarchyService.getDeviceTypes(query);
    }
  
    @Post('/device-types')
    @ApiOperation({ summary: 'Create Device Type' })
    @ApiCreatedResponse({ type: DeviceTypeDto })
    createDeviceType(@Body() dto: CreateDeviceTypeDto) {
      this.logger.debug(`Creating device type with data: ${JSON.stringify(dto)}`);
      return this.hierarchyService.createDeviceType(dto);
    }
  
    @Get('/device-types/:name')
    @ApiOperation({ summary: 'Get Device Type by name' })
    @ApiOkResponse({ type: DeviceTypeDto })
    getDeviceType(@Param() params: DeviceTypeParams) {
      this.logger.debug(`Getting device type by name: ${params.name}`);
      return this.hierarchyService.getDeviceType(params);
    }
  
    @Put('/device-types/:name')
    @ApiOperation({ summary: 'Update Device Type' })
    @ApiOkResponse({ type: DeviceTypeDto })
    @ApiBody({ type: UpdateDeviceTypeDto })
    updateDeviceType(@Param() params: DeviceTypeParams, @Body() dto: UpdateDeviceTypeDto) {
      this.logger.debug(`Updating device type: ${params.name} with data: ${JSON.stringify(dto)}`);
      return this.hierarchyService.updateDeviceType(params, dto);
    }
  
    @Delete('/device-types/:name')
    @ApiOperation({ summary: 'Delete Device Type' })
    @ApiOkResponse()
    deleteDeviceType(@Param() params: DeviceTypeParams) {
      this.logger.debug(`Deleting device type: ${params.name}`);
      return this.hierarchyService.deleteDeviceType(params);
    }
  
}