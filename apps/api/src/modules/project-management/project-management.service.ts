import { ProjectManagementTopics } from "@app/common/microservice-client/topics";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { AddMemberToProjectDto, EditProjectMemberDto, CreateProjectDto, CreateRegulationDto, UpdateRegulationDto, RegulationParams, ProjectMemberParams, ProjectIdentifierParams, GetProjectsQueryDto, SearchProjectsQueryDto} from "@app/common/dto/project-management";
import { MicroserviceClient, MicroserviceName } from "@app/common/microservice-client";
import { UserSearchDto } from "@app/common/oidc/oidc.interface";


@Injectable()
export class ProjectManagementService implements OnModuleInit{
  
  constructor(
    @Inject(MicroserviceName.PROJECT_MANAGEMENT_SERVICE) private readonly projectManagementClient: MicroserviceClient) {
    }
    
    getAllUsers(params: UserSearchDto) {
      return this.projectManagementClient.send(ProjectManagementTopics.GET_USERS, params)
    }

  createProject(user: any, projectDto: CreateProjectDto){
    projectDto.username = user?.email;
    return this.projectManagementClient.send(
      ProjectManagementTopics.CREATE_PROJECT,
      projectDto
    )
  }

  addMemberToProject(projectMemberDto: AddMemberToProjectDto, params: ProjectIdentifierParams){
    projectMemberDto.projectIdentifier = params.projectIdentifier;
    return this.projectManagementClient.send(
      ProjectManagementTopics.ADD_PROJECT_NEW_MEMBER,
      projectMemberDto
    )
  }

  confirmMemberToProject(params: ProjectIdentifierParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.CONFIRM_PROJECT_MEMBER,
      params
    )
  }

  removeMemberFromProject(params: ProjectMemberParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.REMOVE_PROJECT_MEMBER,
      params
    )
  }

  editMember(editProjectMemberDto: EditProjectMemberDto, params: ProjectMemberParams){
    editProjectMemberDto.projectIdentifier = params.projectIdentifier;
    editProjectMemberDto.memberId = params.memberId;
    return this.projectManagementClient.send(
      ProjectManagementTopics.EDIT_PROJECT_MEMBER,
      editProjectMemberDto
    )
  }

  getProjects(query: GetProjectsQueryDto){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_PROJECTS,
      query
    )
  }

  searchProjects(query: SearchProjectsQueryDto){
    return this.projectManagementClient.send(
      ProjectManagementTopics.SEARCH_PROJECTS, 
      query
    )
  }

  getProject(params: ProjectIdentifierParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_PROJECT_BY_IDENTIFIER,
      params
    )
  }

  getUserProjects(user: any){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_USER_PROJECTS,
      user.email
    )
  }

  createToken(params: ProjectIdentifierParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.CREATE_PROJECT_TOKEN,
      params
    )
  }

  getProjectReleases(params: ProjectIdentifierParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_PROJECT_RELEASES,
      params
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

  getProjectRegulations(params: ProjectIdentifierParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_PROJECT_REGULATIONS,
      params
    )
  }

  getProjectRegulationById(params: RegulationParams){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_PROJECT_REGULATION_BY_ID,
      params
    )
  }

  createProjectRegulation(createRegulationDto: CreateRegulationDto, params: ProjectIdentifierParams){
    createRegulationDto.projectIdentifier = params.projectIdentifier;
    return this.projectManagementClient.send(
      ProjectManagementTopics.CREATE_PROJECT_REGULATION,
      createRegulationDto
    )
  }

  editProjectRegulation(params: RegulationParams, updateRegulationDto: UpdateRegulationDto){
    updateRegulationDto.regulationId = params.regulationId;
    updateRegulationDto.projectIdentifier = params.projectIdentifier;
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

  


  checkHealth() {
    return this.projectManagementClient.send(ProjectManagementTopics.CHECK_HEALTH, {})
  }

  async onModuleInit() {
    this.projectManagementClient.subscribeToResponseOf(Object.values(ProjectManagementTopics));
    await this.projectManagementClient.connect();
  }
}