import { ProjectManagementTopics } from "@app/common/microservice-client/topics";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { AddMemberToProjectDto, EditProjectMemberDto, CreateProjectDto, CreateRegulationDto, UpdateRegulationDto, RegulationParams, ProjectMemberParams, RegulationStatusParams, VersionRegulationStatusParams, SetRegulationCompliancyDto, SetRegulationStatusDto } from "@app/common/dto/project-management";
import { MicroserviceClient, MicroserviceName } from "@app/common/microservice-client";


@Injectable()
export class ProjectManagementService implements OnModuleInit{

  constructor(
    @Inject(MicroserviceName.PROJECT_MANAGEMENT_SERVICE) private readonly projectManagementClient: MicroserviceClient) {
   }
  

  createProject(user: any, projectDto: CreateProjectDto){
    projectDto.username = user?.email;
    return this.projectManagementClient.send(
      ProjectManagementTopics.CREATE_PROJECT,
      projectDto
    )
  }

  addMemberToProject(projectMemberDto: AddMemberToProjectDto, projectId: number){
    projectMemberDto.projectId = projectId;
    return this.projectManagementClient.send(
      ProjectManagementTopics.ADD_PROJECT_NEW_MEMBER,
      projectMemberDto
    )
  }

  ConfirmMemberToProject(projectId:  number){
    return this.projectManagementClient.send(
      ProjectManagementTopics.CONFIRM_PROJECT_MEMBER,
      projectId
    )
  }

  removeMemberFromProject(params: ProjectMemberParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.REMOVE_PROJECT_MEMBER,
      params
    )
  }

  editMember(editProjectMemberDto: EditProjectMemberDto, params: ProjectMemberParams){
    editProjectMemberDto.projectId = params.projectId;
    editProjectMemberDto.memberId = params.memberId;
    return this.projectManagementClient.send(
      ProjectManagementTopics.EDIT_PROJECT_MEMBER,
      editProjectMemberDto
    )
  }

  getUserProjects(user: any){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_USER_PROJECTS,
      user.email
    )
  }

  createToken(projectId: number){
    return this.projectManagementClient.send(
      ProjectManagementTopics.CREATE_PROJECT_TOKEN,
      {projectId: projectId}
    )
  }

  getProjectReleases(projectId: number){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_PROJECT_RELEASES,
      {projectId: projectId}
    )
  }

  getDevicesByCatalogId(catalogId: string){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_DEVICES_BY_CATALOG_ID,
      catalogId
    )
  }

  getDevicesByProject(projectId: number){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_DEVICES_BY_PROJECT,
      projectId
    )
  }

  getDeviceByPlatform(platform: string){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_DEVICES_BY_PLATFORM,
      platform
    )
  }


  getAllRegulationTypes(){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_REGULATION_TYPES,
      {}
    )
  }

  getProjectRegulations(projectId: number){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_PROJECT_REGULATIONS,
      {projectId: projectId}
    )
  }

  getProjectRegulationById(params: RegulationParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_PROJECT_REGULATION_BY_ID,
      params
    )
  }

  createProjectRegulation(projectId: number, createRegulationDto: CreateRegulationDto){
    createRegulationDto.projectId = projectId;
    return this.projectManagementClient.send(
      ProjectManagementTopics.CREATE_PROJECT_REGULATION,
      createRegulationDto
    )
  }

  editProjectRegulation(params: RegulationParams, updateRegulationDto: UpdateRegulationDto){
    updateRegulationDto.regulationId = params.regulationId;
    updateRegulationDto.projectId = params.projectId;
    return this.projectManagementClient.send(
      ProjectManagementTopics.UPDATE_PROJECT_REGULATION,
      updateRegulationDto
    )
  }


  deleteProjectRegulation(params: RegulationParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.DELETE_PROJECT_REGULATION,
      params
    )
  }

  getVersionRegulationStatus(params: RegulationStatusParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_VERSION_REGULATION_STATUS_BY_ID,
      params
    )
  }

  getVersionRegulationsStatuses(params: VersionRegulationStatusParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_VERSION_REGULATIONS_STATUSES,
      params
    )
  }

  setRegulationStatus(params: RegulationStatusParams, setRegulationStatusDto: SetRegulationStatusDto){
    setRegulationStatusDto.regulationId = params.regulationId;
    setRegulationStatusDto.versionId = params.versionId;
    setRegulationStatusDto.projectId = params.projectId;
    return this.projectManagementClient.send(
      ProjectManagementTopics.SET_VERSION_REGULATION_STATUS,
      setRegulationStatusDto
    )
  }

  setRegulationCompliancy(params: RegulationStatusParams, setRegulationCompliancyDto: SetRegulationCompliancyDto){
    setRegulationCompliancyDto.regulationId = params.regulationId;
    setRegulationCompliancyDto.versionId = params.versionId;
    setRegulationCompliancyDto.projectId = params.projectId;
    return this.projectManagementClient.send(
      ProjectManagementTopics.SET_VERSION_REGULATION_COMPLIANCE,
      setRegulationCompliancyDto
    )
  }


  deleteVersionRegulationStatus(params: RegulationStatusParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.DELETE_VERSION_REGULATION_STATUS,
      params
    )
  }


  checkHealth() {
    return this.projectManagementClient.send(ProjectManagementTopics.CHECK_HEALTH, {})
  }

  async onModuleInit() {
    this.projectManagementClient.subscribeToResponseOf(Object.values(ProjectManagementTopics));
    await this.projectManagementClient.connect();
  }
}