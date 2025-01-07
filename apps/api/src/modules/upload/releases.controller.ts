import { Body, Controller, Delete, Get, Logger, Param, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ReleasesService } from "./releases.service";
import { ReleaseDto, SetReleaseDto, SetReleaseArtifactResDto, SetReleaseArtifactDto } from "@app/common/dto/upload";
import { Unprotected } from "nest-keycloak-connect";


@ApiTags('Releases')
@Controller('releases')
export class ReleasesController {

  private readonly logger = new Logger(ReleasesController.name);
  
  constructor(private readonly uploadService: ReleasesService){}



  @Post('project/:projectId')
  @ApiOperation({ 
    summary: "Set a Release", 
    description: "This service message allows creation of a release." 
  })
  @Unprotected()
  @ApiOkResponse({type: ReleaseDto})
  setRelease(@Body() release: SetReleaseDto){
    this.logger.log(`setRelease, version: ${JSON.stringify(release)}`)
    // return this.uploadService.setRelease(release)
  }


  @Get('project/:projectId')
  @ApiOperation({
    summary: "Get Releases", 
    description: "This service message allows retrieval of releases."
  })
  @Unprotected()
  @ApiOkResponse({type: ReleaseDto, isArray: true})
  getReleases(){
    this.logger.log(`getReleases`)
    // return this.uploadService.getReleases()
  }


  @Get('project/:projectId/version/:version')
  @ApiOperation({
    summary: "Get Release", 
    description: "This service message allows retrieval of a release."
  })
  @Unprotected()
  @ApiOkResponse({type: ReleaseDto})
  getRelease(@Param() params: {version: string}){
    this.logger.log(`getRelease, version: ${params.version}`)
    // return this.uploadService.getRelease(params)
  }



  @Delete('project/:projectId/version/:version')
  @ApiOperation({
    summary: "Delete Release", 
    description: "This service message allows deletion of a release."
  })
  @Unprotected()
  @ApiOkResponse({type: ReleaseDto})
  deleteRelease(@Param() params: {version: string}){
    this.logger.log(`deleteRelease, version: ${params.version}`)
    // return this.uploadService.deleteRelease(params)
  }


  @Post('project/:projectId/version/:version/artifact')
  @ApiOperation({
    summary: "Set Release Artifact",
    description: "This service message allows creation of a release artifact."
  })
  @Unprotected()
  @ApiOkResponse({type: SetReleaseArtifactResDto})
  setReleaseArtifact(@Body() artifact: SetReleaseArtifactDto){
    // this.logger.log(`setReleaseArtifact, release: ${artifact.version}, artifactName: ${artifact.artifactName}`)
    // this.uploadService.setReleaseArtifact(artifact)
  }

  @Delete('project/:projectId/version/:version/artifact')
  @ApiOperation({
    summary: "Delete Release Artifact",
  }) 
  @Unprotected()
  @ApiOkResponse({type: SetReleaseArtifactResDto})
  deleteReleaseArtifact(@Body() artifact: SetReleaseArtifactDto){
    // this.logger.log(`deleteReleaseArtifact, release: ${artifact?.}, artifactName: ${artifact.artifactName}`)
    // this.uploadService.deleteReleaseArtifact(artifact)
  }

  
}