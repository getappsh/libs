import { ReleaseParams, SetReleaseDto } from "@app/common/dto/upload";
import { MicroserviceClient, MicroserviceName } from "@app/common/microservice-client";
import { UploadTopics } from "@app/common/microservice-client/topics";
import { Inject, Injectable, Logger } from "@nestjs/common";


@Injectable()
export class ReleasesService {
  private readonly logger = new Logger(ReleasesService.name)

  constructor(
    @Inject(MicroserviceName.UPLOAD_SERVICE) private uploadClient: MicroserviceClient
  ){}

  setRelease(dto: SetReleaseDto, projectId: number){
    dto.projectId = projectId;
    return this.uploadClient.send(UploadTopics.SET_RELEASE, dto);
  }

  getReleases(projectId: number){
    return this.uploadClient.send(UploadTopics.GET_RELEASES, {projectId: projectId});
  }

  getRelease(params: ReleaseParams){
    return this.uploadClient.send(UploadTopics.GET_RELEASE_BY_VERSION, params);
  }


  deleteRelease(params: ReleaseParams){
    return this.uploadClient.send(UploadTopics.DELETE_RELEASE, params);
  }


  setReleaseArtifact(dto: SetReleaseDto, params: ReleaseParams){
    dto.projectId = params.projectId;
    dto.version = params.version;
    return this.uploadClient.send(UploadTopics.SET_RELEASE_ARTIFACT, dto);
  }


  deleteReleaseArtifact(params: ReleaseParams){
    return this.uploadClient.send(UploadTopics.DELETE_RELEASE_ARTIFACT, params);
  }
}