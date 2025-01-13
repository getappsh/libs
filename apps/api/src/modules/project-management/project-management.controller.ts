import { Body, Controller, Get, Post, Delete, Put, Param, Logger, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam, ApiCreatedResponse, ApiOkResponse, ApiExcludeEndpoint } from "@nestjs/swagger";
import { AuthUser, Unprotected } from "../../utils/sso/sso.decorators";
import { PROJECT_MANAGEMENT } from "@app/common/utils/paths";
import { ProjectManagementService } from "./project-management.service";
import {
  AddMemberToProjectDto, ProjectDto, EditProjectMemberDto,
  ProjectTokenDto, ProjectReleasesDto, MemberProjectResDto,
  MemberProjectsResDto, MemberResDto,
  CreateProjectDto,
  CreateRegulationDto,
  RegulationDto,
  RegulationTypeDto,
  UpdateRegulationDto,
  RegulationParams,
  ProjectMemberParams
} from "@app/common/dto/project-management";
import { DeviceResDto } from "@app/common/dto/project-management/dto/device-res.dto";
import { UserContextInterceptor } from "../../utils/interceptor/user-context.interceptor";


@ApiTags('Project')
@ApiBearerAuth()
@UseInterceptors(UserContextInterceptor)
@Controller(PROJECT_MANAGEMENT)
export class ProjectManagementController {

  private readonly logger = new Logger(ProjectManagementController.name);
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) { }

  @Post('')
  @ApiOperation({ summary: 'Create Project' })
  @ApiOkResponse({ type: ProjectDto })
  createProject(@AuthUser() user: any, @Body() projectDto: CreateProjectDto) {
    return this.projectManagementService.createProject(user, projectDto)
  }

  @Post('/:projectId/member')
  @ApiOperation({ summary: 'Add member to Project' })
  @ApiParam({ name: 'projectId', type: Number })
  @ApiCreatedResponse({ type: MemberProjectResDto })
  addMemberToProject(@Body() projectMemberDto: AddMemberToProjectDto, @Param("projectId") projectId: number) {
    return this.projectManagementService.addMemberToProject(projectMemberDto, projectId)
  }

  @Get('')
  @ApiOperation({ summary: "Get all User's projects" })
  @ApiOkResponse({ type: MemberProjectsResDto })
  getUserProjects(@AuthUser() user: any) {
    return this.projectManagementService.getUserProjects(user);
  }

  @Post('/:projectId/createToken')
  @ApiOperation({ summary: "Create Upload token for a Project" })
  @ApiParam({ name: 'projectId', type: Number })
  @ApiCreatedResponse({ type: ProjectTokenDto })
  createToken( @Param('projectId') projectId:  number) {
    return this.projectManagementService.createToken(projectId);
  }

  @Post('/:projectId/confirm')
  @ApiOperation({ summary: 'Confirm invitation for project' })
  @ApiOkResponse({type: ProjectDto})
  ConfirmMemberToProject(@Param('projectId') projectId:  number) {
    return this.projectManagementService.ConfirmMemberToProject(projectId)
  }

  @Delete('/:projectId/member/:memberId')
  @ApiOperation({ summary: 'Remove member from Project' })
  @ApiOkResponse()
  removeMemberFromProject(@Param() params: ProjectMemberParams) {
    return this.projectManagementService.removeMemberFromProject(params)
  }

  @Put('/:projectId/member/:memberId')
  @ApiOperation({ summary: 'Edit member details' })
  @ApiOkResponse({ type: MemberResDto })
  editMember(@Body() editProjectMemberDto: EditProjectMemberDto, @Param() params: ProjectMemberParams) {
    return this.projectManagementService.editMember(editProjectMemberDto, params)
  }
  
  @Get('/:projectId/projectReleases')
  @ApiOperation({ summary: 'Get project release' })
  @ApiParam({ name: 'projectId', type: Number })
  @ApiOkResponse({ type: ProjectReleasesDto, isArray: true })
  getProjectReleases(@Param('projectId') projectId: number) {
    return this.projectManagementService.getProjectReleases(projectId);
  }

  @Get('devices/catalogId/:catalogId')
  @ApiOperation({ summary: 'Get all devices with catalogId' })
  @ApiParam({ name: 'catalogId', type: String })
  @ApiOkResponse({ type: DeviceResDto, isArray: true })
  getDevicesByCatalogId(@Param('catalogId') catalogId: string) {
    return this.projectManagementService.getDevicesByCatalogId(catalogId);
  }

  @Get('devices/project/:projectId')
  @ApiOperation({ summary: 'Get all devices using component of the projectId' })
  @ApiParam({ name: 'projectId', type: Number })
  @ApiOkResponse({ type: DeviceResDto, isArray: true })
  getDevicesByProject(@Param('projectId') projectId: number) {
    return this.projectManagementService.getDevicesByProject(projectId);
  }

  @Get('devices/platform/:platform')
  @ApiOperation({ summary: 'Get all devices in platform' })
  @ApiParam({ name: 'platform', type: String })
  @ApiOkResponse({ type: DeviceResDto, isArray: true })
  getDeviceByPlatform(@Param('platform') platform: string) {
    return this.projectManagementService.getDeviceByPlatform(platform);
  }


  @Get('regulation-types')
  @ApiOperation({ summary: 'Get all Regulation Types' })
  @ApiOkResponse({ type: [RegulationTypeDto] })
  getAllRegulationTypes() {
    this.logger.debug("Getting all regulation types");
    return this.projectManagementService.getAllRegulationTypes();
  }

  @Get('/:projectId/regulation')
  @ApiOperation({ summary: 'Get all Project Regulations' })
  @ApiParam({ name: 'projectId' })
  @ApiOkResponse({ type: RegulationDto, isArray: true })
  getProjectRegulations(@Param('projectId') projectId: number) {
    this.logger.debug("Getting all project regulations for project: ", projectId);
    return this.projectManagementService.getProjectRegulations(projectId);
  }

  @Get('/:projectId/regulation/:regulationId')
  @ApiOperation({ summary: 'Get Regulation by ID' })
  @ApiOkResponse({ type: RegulationDto })
  getProjectRegulationById(@Param() regulationParams: RegulationParams) {
    this.logger.debug(`Getting regulation by Project ID: ${regulationParams.projectId} and Regulation ID: ${regulationParams.regulationId}`);
    return this.projectManagementService.getProjectRegulationById(regulationParams);
  }

  @Post('/:projectId/regulation')
  @ApiOperation({ summary: 'Create Regulation' })
  @ApiParam({ name: 'projectId' })
  @ApiCreatedResponse({ type: RegulationDto })
  createProjectRegulation(@Param('projectId') projectId: number, @Body() createRegulationDto: CreateRegulationDto) {
    this.logger.debug(`Creating regulation for project: ${projectId}`, JSON.stringify(createRegulationDto));
    return this.projectManagementService.createProjectRegulation(projectId, createRegulationDto);
  }

  @Put('/:projectId/regulation/:regulationId')
  @ApiOperation({ summary: 'Edit Regulation' })
  @ApiOkResponse({ type: RegulationDto })
  editProjectRegulation(@Param() regulationParams: RegulationParams, @Body() updateRegulationDto: UpdateRegulationDto) {
    console.log(regulationParams);
    this.logger.debug(`Editing regulation by Project ID: ${regulationParams.projectId} and Regulation ID: ${regulationParams.regulationId}`, JSON.stringify(updateRegulationDto));
    return this.projectManagementService.editProjectRegulation(regulationParams, updateRegulationDto);
  }

  @Delete('/:projectId/regulation/:regulationId')
  @ApiOperation({ summary: 'Delete Regulation by ID' })
  @ApiOkResponse()
  deleteProjectRegulation(@Param() regulationParams: RegulationParams) {
    this.logger.debug(`Deleting regulation by Project ID: ${regulationParams.projectId} and Regulation ID: ${regulationParams.regulationId}`);
    return this.projectManagementService.deleteProjectRegulation(regulationParams);
  }

  @Get('checkHealth')
  @Unprotected()
  @ApiExcludeEndpoint()
  checkHealth(){
    this.logger.log("Project management service - Health checking")
    return this.projectManagementService.checkHealth()
  }
}