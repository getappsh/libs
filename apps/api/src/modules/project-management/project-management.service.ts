import { ProjectManagementTopics } from "@app/common/microservice-client/topics";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { AddMemberToProjectDto, EditProjectMemberDto, CreateProjectDto, CreateRegulationDto, UpdateRegulationDto, RegulationParams, ProjectMemberParams} from "@app/common/dto/project-management";
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

  getProject(projectIdentifier: string | number){
    return this.projectManagementClient.send(
      ProjectManagementTopics.GET_PROJECT_BY_IDENTIFIER,
    {projectIdentifier: projectIdentifier}
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

  


  checkHealth() {
    return this.projectManagementClient.send(ProjectManagementTopics.CHECK_HEALTH, {})
  }

  async onModuleInit() {
    this.projectManagementClient.subscribeToResponseOf(Object.values(ProjectManagementTopics));
    await this.projectManagementClient.connect();
  }
}