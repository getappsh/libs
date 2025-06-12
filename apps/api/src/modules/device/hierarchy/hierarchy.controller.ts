import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { HierarchyService } from "./hierarchy.service";
import { DeviceTypeDto, CreateDeviceTypeDto, DeviceTypeParams, UpdateDeviceTypeDto, CreatePlatformDto, PlatformDto, PlatformParams, UpdatePlatformDto, PlatformDeviceTypeParams } from "@app/common/dto/devices-hierarchy";


@ApiTags("Device - Hierarchy")
@ApiBearerAuth()
@Controller("device/hierarchy")
export class HierarchyController {
  private readonly logger = new Logger(HierarchyController.name);

  constructor(private readonly hierarchyService: HierarchyService) {}


  @Get('/platforms')
  @ApiOperation({ summary: 'Get all platforms' })
  @ApiOkResponse({ type: PlatformDto, isArray: true })
  @ApiQuery({ name: 'query', required: false, description: 'Query to search platforms', type: String })
  getPlatforms(@Query('query') query?: string) {
    this.logger.debug(`Getting all platforms with query: ${query}`);
    return this.hierarchyService.getPlatforms(query)
  }

  @Post('/platforms')
  @ApiOperation({ summary: 'Create Platform' })
  @ApiCreatedResponse({ type: PlatformDto })
  createPlatform(@Body() dto: CreatePlatformDto) {
    this.logger.debug(`Creating platform with data: ${JSON.stringify(dto)}`);
    return this.hierarchyService.createPlatform(dto);
  }

  @Get('/platforms/:name')
  @ApiOperation({ summary: 'Get Platform by name' })
  @ApiOkResponse({ type: PlatformDto })
  getPlatform(@Param() params: PlatformParams) {
    this.logger.debug(`Getting platform by name: ${params.name}`);
    return this.hierarchyService.getPlatform(params);
  }

  @Put('/platforms/:name')
  @ApiOperation({ summary: 'Update Platform' })
  @ApiOkResponse({ type: PlatformDto })
  @ApiBody({ type: UpdatePlatformDto })
  updatePlatform(@Param() params: PlatformParams, @Body() dto: UpdatePlatformDto) {
    this.logger.debug(`Updating platform: ${params.name} with data: ${JSON.stringify(dto)}`);
    return this.hierarchyService.updatePlatform(params, dto);
  }

  @ApiOperation({ summary: 'Delete Platform' })
  @ApiOkResponse()
  @Delete('/platforms/:name')
  deletePlatform(@Param() params: PlatformParams) {
    this.logger.debug(`Deleting platform: ${params.name}`);
    return this.hierarchyService.deletePlatform(params);
  }


  @ApiOperation({ summary: 'Add Device Type to Platform' })
  // @ApiOkResponse({ type: PlatformDto })
  @Put('/platforms/:platformName/device-types/:deviceTypeName')
  addDeviceTypeToPlatform(@Param() params: PlatformDeviceTypeParams) {
    this.logger.debug(`Adding device type: '${params.deviceTypeName}' to platform: '${params.platformName}'`);
    return this.hierarchyService.addDeviceTypeToPlatform(params);
  }

  @ApiOperation({ summary: 'Remove Device Type from Platform' })
  // @ApiOkResponse({ type: PlatformDto })
  @Delete('/platforms/:platformName/device-types/:deviceTypeName')
  removeDeviceTypeFromPlatform(@Param() params: PlatformDeviceTypeParams) {
    this.logger.debug(`Removing device type: '${params.deviceTypeName}' to platform: '${params.platformName}'`);
    return this.hierarchyService.removeDeviceTypeFromPlatform(params);
  }

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