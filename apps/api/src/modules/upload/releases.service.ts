import { ReleaseParams, SetReleaseDto, RegulationStatusParams, VersionRegulationStatusParams, SetRegulationCompliancyDto, SetRegulationStatusDto } from "@app/common/dto/upload";
import { MicroserviceClient, MicroserviceName } from "@app/common/microservice-client";
import { UploadTopics } from "@app/common/microservice-client/topics";
import { Inject, Injectable, Logger } from "@nestjs/common";


@Injectable()
export class ReleasesService {
  private readonly logger = new Logger(ReleasesService.name)

  constructor(
    @Inject(MicroserviceName.UPLOAD_SERVICE) private uploadClient: MicroserviceClient
  ) { }

  setRelease(dto: SetReleaseDto, projectId: number) {
    dto.projectId = projectId;
    return this.uploadClient.send(UploadTopics.SET_RELEASE, dto);
  }

  getReleases(projectId: number) {
    return this.uploadClient.send(UploadTopics.GET_RELEASES, { projectId: projectId });
  }

  getRelease(params: ReleaseParams) {
    return this.uploadClient.send(UploadTopics.GET_RELEASE_BY_VERSION, params);
  }


  deleteRelease(params: ReleaseParams) {
    return this.uploadClient.send(UploadTopics.DELETE_RELEASE, params);
  }

  setReleaseArtifact(dto: SetReleaseDto, params: ReleaseParams) {
    dto.projectId = params.projectId;
    dto.version = params.version;
    return this.uploadClient.send(UploadTopics.SET_RELEASE_ARTIFACT, dto);
  }


  deleteReleaseArtifact(params: ReleaseParams) {
    return this.uploadClient.send(UploadTopics.DELETE_RELEASE_ARTIFACT, params);
  }


  getVersionRegulationStatus(params: RegulationStatusParams) {
    return this.uploadClient.send(
      UploadTopics.GET_VERSION_REGULATION_STATUS_BY_ID,
      params
    )
  }

  getVersionRegulationsStatuses(params: VersionRegulationStatusParams) {
    return this.uploadClient.send(
      UploadTopics.GET_VERSION_REGULATIONS_STATUSES,
      params
    )
  }

  setRegulationStatus(params: RegulationStatusParams, setRegulationStatusDto: SetRegulationStatusDto) {
    setRegulationStatusDto.regulation = params.regulation;
    setRegulationStatusDto.version = params.version;
    setRegulationStatusDto.projectId = params.projectId;
    return this.uploadClient.send(
      UploadTopics.SET_VERSION_REGULATION_STATUS,
      setRegulationStatusDto
    )
  }

  setRegulationCompliancy(params: RegulationStatusParams, setRegulationCompliancyDto: SetRegulationCompliancyDto) {
    setRegulationCompliancyDto.regulation = params.regulation;
    setRegulationCompliancyDto.version = params.version;
    setRegulationCompliancyDto.projectId = params.projectId;
    return this.uploadClient.send(
      UploadTopics.SET_VERSION_REGULATION_COMPLIANCE,
      setRegulationCompliancyDto
    )
  }


  deleteVersionRegulationStatus(params: RegulationStatusParams) {
    return this.uploadClient.send(
      UploadTopics.DELETE_VERSION_REGULATION_STATUS,
      params
    )
  }
}