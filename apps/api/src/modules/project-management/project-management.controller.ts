import { Body, Controller, Get, Post, Delete, Put, Param, Logger, UseInterceptors, Query, Version } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam, ApiCreatedResponse, ApiOkResponse, ApiExcludeEndpoint } from "@nestjs/swagger";
import { AuthUser, Unprotected } from "../../utils/sso/sso.decorators";
import { PROJECT_MANAGEMENT } from "@app/common/utils/paths";
import { ProjectManagementService } from "./project-management.service";
import {
  AddMemberToProjectDto, ExtendedProjectDto, EditProjectMemberDto,
  ProjectTokenDto, ProjectReleasesDto, MemberProjectResDto,
  MemberProjectsResDto, MemberResDto,
  CreateProjectDto,
  CreateRegulationDto,
  RegulationDto,
  RegulationTypeDto,
  UpdateRegulationDto,
  RegulationParams,
  ProjectMemberParams,
  ProjectIdentifierParams,
  SearchProjectsQueryDto,
  GetProjectsQueryDto,
  BaseProjectDto,

} from "@app/common/dto/project-management";
import { DeviceResDto } from "@app/common/dto/project-management/dto/device-res.dto";
import { UserContextInterceptor } from "../../utils/interceptor/user-context.interceptor";
import { ApiOkResponsePaginated } from "@app/common/dto/pagination.dto";

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
  @ApiOkResponse({ type: ExtendedProjectDto })
  createProject(@AuthUser() user: any, @Body() projectDto: CreateProjectDto) {
    return this.projectManagementService.createProject(user, projectDto)
  }

  @Post('/:projectIdentifier/member')
  @ApiOperation({ summary: 'Add member to Project' })
  @ApiCreatedResponse({ type: MemberProjectResDto })
  addMemberToProject(@Body() projectMemberDto: AddMemberToProjectDto, @Param() params: ProjectIdentifierParams) {
    return this.projectManagementService.addMemberToProject(projectMemberDto, params)
  }

  @Get('')
  @ApiOperation({ summary: "Get all User's projects" })
  @ApiOkResponse({ type: MemberProjectsResDto })
  getUserProjects(@AuthUser() user: any) {
    return this.projectManagementService.getUserProjects(user);
  }

  @Get()
  @Version('2')
  @ApiOperation({ summary: 'Get all projects' })
  @ApiOkResponsePaginated(ExtendedProjectDto)
  getProjects(@Query() query: GetProjectsQueryDto){
    this.logger.debug(`Getting all projects: ${JSON.stringify(query)}`);
    return this.projectManagementService.getProjects(query);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search projects' })
  @ApiOkResponsePaginated(BaseProjectDto)
  searchProjects(@Query() query: SearchProjectsQueryDto) {
    this.logger.debug(`Searching projects: ${JSON.stringify(query)}`);
    return this.projectManagementService.searchProjects(query);
  }

  @Get('/:projectIdentifier')
  @ApiOperation({ summary: 'Get Project details' })
  @ApiOkResponse({ type: ExtendedProjectDto })
  getProject(@Param() params: ProjectIdentifierParams) {
    this.logger.debug(`Getting project: ${params.projectIdentifier}`);
    return this.projectManagementService.getProject(params)
  }

  @Post('/:projectIdentifier/createToken')
  @ApiOperation({ summary: "Create Upload token for a Project" })
  @ApiCreatedResponse({ type: ProjectTokenDto })
  createToken( @Param() params: ProjectIdentifierParams) {
    return this.projectManagementService.createToken(params);
  }

  @Post('/:projectIdentifier/confirm')
  @ApiOperation({ summary: 'Confirm invitation for project' })
  @ApiOkResponse({type: ExtendedProjectDto})
  confirmMemberToProject(@Param() params: ProjectIdentifierParams) {
    return this.projectManagementService.confirmMemberToProject(params)
  }

  @Delete('/:projectIdentifier/member/:memberId')
  @ApiOperation({ summary: 'Remove member from Project' })
  @ApiOkResponse()
  removeMemberFromProject(@Param() params: ProjectMemberParams) {
    return this.projectManagementService.removeMemberFromProject(params)
  }

  @Put('/:projectIdentifier/member/:memberId')
  @ApiOperation({ summary: 'Edit member details' })
  @ApiOkResponse({ type: MemberResDto })
  editMember(@Body() editProjectMemberDto: EditProjectMemberDto, @Param() params: ProjectMemberParams) {
    return this.projectManagementService.editMember(editProjectMemberDto, params)
  }
  
  @Get('/:projectIdentifier/projectReleases')
  @ApiOperation({ summary: 'Get project release' })
  @ApiOkResponse({ type: ProjectReleasesDto, isArray: true })
  getProjectReleases(@Param() params: ProjectIdentifierParams) {
    return this.projectManagementService.getProjectReleases(params);
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

  @Get('/:projectIdentifier/regulation')
  @ApiOperation({ summary: 'Get all Project Regulations' })
  @ApiOkResponse({ type: RegulationDto, isArray: true })
  getProjectRegulations(@Param() params: ProjectIdentifierParams) {
    this.logger.debug("Getting all project regulations for project: ", params);
    return this.projectManagementService.getProjectRegulations(params);
  }

  @Get('/:projectIdentifier/regulation/:regulationId')
  @ApiOperation({ summary: 'Get Regulation by ID' })
  @ApiOkResponse({ type: RegulationDto })
  getProjectRegulationById(@Param() regulationParams: RegulationParams) {
    this.logger.debug(`Getting regulation by Project: ${regulationParams.regulationId} and Regulation ID: ${regulationParams.regulationId}`);
    return this.projectManagementService.getProjectRegulationById(regulationParams);
  }

  @Post('/:projectIdentifier/regulation')
  @ApiOperation({ summary: 'Create Regulation' })
  @ApiCreatedResponse({ type: RegulationDto })
  createProjectRegulation(@Param() params: ProjectIdentifierParams, @Body() createRegulationDto: CreateRegulationDto) {
    this.logger.debug(`Creating regulation for project: ${params.projectIdentifier}`, JSON.stringify(createRegulationDto));
    return this.projectManagementService.createProjectRegulation(createRegulationDto, params);
  }

  @Put('/:projectIdentifier/regulation/:regulationId')
  @ApiOperation({ summary: 'Edit Regulation' })
  @ApiOkResponse({ type: RegulationDto })
  editProjectRegulation(@Param() regulationParams: RegulationParams, @Body() updateRegulationDto: UpdateRegulationDto) {
    this.logger.debug(`Editing regulation by Project: ${regulationParams.projectIdentifier} and Regulation ID: ${regulationParams.regulationId}`, JSON.stringify(updateRegulationDto));
    return this.projectManagementService.editProjectRegulation(regulationParams, updateRegulationDto);
  }

  @Delete('/:projectIdentifier/regulation/:regulationId')
  @ApiOperation({ summary: 'Delete Regulation by ID' })
  @ApiOkResponse()
  deleteProjectRegulation(@Param() regulationParams: RegulationParams) {
    this.logger.debug(`Deleting regulation by Project: ${regulationParams.projectIdentifier} and Regulation ID: ${regulationParams.regulationId}`);
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