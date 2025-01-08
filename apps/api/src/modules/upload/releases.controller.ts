import { Body, Controller, Delete, Get, Logger, Param, Post, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ReleasesService } from "./releases.service";
import { ReleaseDto, SetReleaseDto, SetReleaseArtifactResDto, SetReleaseArtifactDto, ReleaseParams, RegulationStatusParams, VersionRegulationStatusParams, SetRegulationCompliancyDto, SetRegulationStatusDto, RegulationStatusDto  } from "@app/common/dto/upload";
import { AuthOrProject } from '../../utils/sso/sso.decorators';
import { UserContextInterceptor } from "../../utils/interceptor/user-context.interceptor";
import { UPLOAD_RELEASES } from "@app/common/utils/paths";


@ApiHeader({
  name: 'X-Project-Token',
  required: false
})
@ApiBearerAuth()
@ApiTags('Releases')
@AuthOrProject()
@UseInterceptors(UserContextInterceptor)
@Controller(UPLOAD_RELEASES)
export class ReleasesController {

  private readonly logger = new Logger(ReleasesController.name);
  
  constructor(private readonly releasesService: ReleasesService){}


  @Post('project/:projectId')
  @ApiOperation({ 
    summary: "Set a Release", 
    description: "This service message allows creation of a release." 
  })
  @ApiCreatedResponse({type: ReleaseDto})
  @ApiParam({ name: 'projectId', type: Number })
  setRelease(@Body() release: SetReleaseDto, @Param('projectId') projectId: number){
    this.logger.debug(`Setting release for project: ${projectId}, version: ${release.version}`);
    return this.releasesService.setRelease(release, projectId);
  }


  @Get('project/:projectId')
  @ApiOperation({
    summary: "Get Releases", 
    description: "This service message allows retrieval of releases."
  })
  @ApiOkResponse({type: ReleaseDto, isArray: true})
  @ApiParam({ name: 'projectId', type: Number })
  getReleases(@Param('projectId') projectId: number){
    this.logger.debug(`Getting releases for project: ${projectId}`);
    return this.releasesService.getReleases(projectId);
  }


  @Get('project/:projectId/version/:version')
  @ApiOperation({
    summary: "Get Release", 
    description: "This service message allows retrieval of a release."
  })
  @ApiOkResponse({type: ReleaseDto})
  getRelease(@Param() params: ReleaseParams){
    this.logger.debug(`Getting release for project: ${params.projectId}, version: ${params.version}`);
    return this.releasesService.getRelease(params);
  }



  @Delete('project/:projectId/version/:version')
  @ApiOperation({
    summary: "Delete Release", 
    description: "This service message allows deletion of a release."
  })
  @ApiOkResponse({type: SetReleaseArtifactResDto})
  deleteRelease(@Param() params: ReleaseParams){
    this.logger.debug(`Deleting release for project: ${params.projectId}, version: ${params.version}`);
    return this.releasesService.deleteRelease(params);
  }


  @Post('project/:projectId/version/:version/artifact')
  @ApiOperation({
    summary: "Set Release Artifact",
    description: "This service message allows creation of a release artifact."
  })
  @ApiCreatedResponse()
  setReleaseArtifact(@Body() artifact: SetReleaseArtifactDto, @Param() params: ReleaseParams){
    this.logger.debug(`Setting release artifact for project: ${params.projectId}, version: ${params.version}, artifactName: ${artifact.artifactName}`);
    return this.releasesService.setReleaseArtifact(artifact, params);

  }

  @Delete('project/:projectId/version/:version/artifact')
  @ApiOperation({
    summary: "Delete Release Artifact",
  }) 
  @ApiOkResponse({type: SetReleaseArtifactResDto})
  deleteReleaseArtifact(@Param() params: ReleaseParams){
    this.logger.debug(`Deleting release artifact for project: ${params.projectId}, version: ${params.version}`);
    return this.releasesService.deleteReleaseArtifact(params);
  }


  @Get('project/:projectId/version/:version/regulation-status')
  @ApiOperation({ summary: 'Get Version Regulation Statuses by Regulation ID' })
  @ApiOkResponse({ type: [RegulationStatusDto], isArray: true })
  getVersionRegulationStatuses(@Param() params: VersionRegulationStatusParams) {
    this.logger.debug(`Getting version regulation statuses by Project ID: ${params.projectId} and Version: ${params.version}`);
    return this.releasesService.getVersionRegulationsStatuses(params);
  }

  @Get('project/:projectId/version/:version/regulation-status/:regulation')
  @ApiOperation({ summary: 'Get Regulation Status by Regulation ID and Version ID' })
  @ApiOkResponse({ type: RegulationStatusDto })
  getRegulationStatus(@Param() params: RegulationStatusParams) {
    this.logger.debug(`Getting regulation status by Project ID: ${params.projectId}, Regulation: ${params.regulation}, and Version: ${params.version}`);
    return this.releasesService.getVersionRegulationStatus(params);
  }


  @Post('project/:projectId/version/:version/regulation-status/:regulation')
  @ApiOperation({ summary: 'Set Regulation Status' })
  @ApiOkResponse({ type: RegulationStatusDto })
  setRegulationStatus(@Param() params: RegulationStatusParams, @Body() setRegulationStatusDto: SetRegulationStatusDto) {
    this.logger.debug(`Setting regulation status for: ${JSON.stringify(params)}, with: ${JSON.stringify(setRegulationStatusDto)}`);
    return this.releasesService.setRegulationStatus(params, setRegulationStatusDto);
  }

  @Post('project/:projectId/version/:version/regulation-status/:regulation/compliancy')
  @ApiOperation({ summary: 'Set Regulation Compliancy' })
  @ApiOkResponse({ type: RegulationStatusDto })
  setRegulationCompliancy(@Param() params: RegulationStatusParams, @Body() setRegulationCompliancyDto: SetRegulationCompliancyDto) {
    this.logger.debug(`Setting regulation compliancy for: ${JSON.stringify(params)}, with: ${JSON.stringify(setRegulationCompliancyDto)}`);
    return this.releasesService.setRegulationCompliancy(params, setRegulationCompliancyDto);
  }

  @Delete('project/:projectId/version/:version/regulation-status/:regulation')
  @ApiOperation({ summary: 'Delete Regulation Status' })
  @ApiOkResponse({ description: 'Regulation status deleted' })
  deleteRegulationStatus(@Param() params: RegulationStatusParams) {
    this.logger.debug(`Deleting regulation status for Project ID: ${params.projectId}, Regulation: ${params.regulation}, and Version: ${params.version}`);
    return this.releasesService.deleteVersionRegulationStatus(params);
  }

  
}