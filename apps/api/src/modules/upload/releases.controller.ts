import { Body, Controller, Delete, Get, Logger, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ReleasesService } from "./releases.service";
import { ReleaseDto, SetReleaseDto, SetReleaseArtifactResDto, SetReleaseArtifactDto, ReleaseParams } from "@app/common/dto/upload";
import { AuthOrProject, Unprotected } from '../../utils/sso/sso.decorators';
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

  
}