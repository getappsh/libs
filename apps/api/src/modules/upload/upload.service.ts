import { UploadTopics } from '@app/common/microservice-client/topics';
import { Inject, Injectable, Logger, OnModuleInit, UploadedFile } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UploadArtifactDto, UpdateUploadStatusDto, UploadManifestDto } from '@app/common/dto/upload';
import { MicroserviceClient, MicroserviceName } from '@app/common/microservice-client';


@Injectable()
export class UploadService implements OnModuleInit {
  private readonly logger = new Logger(UploadService.name);
  constructor(
    @Inject(MicroserviceName.UPLOAD_SERVICE) private uploadClient: MicroserviceClient){}

  uploadArtifact(data: UploadArtifactDto): Observable<{}> {
    this.logger.log("Upload Artifact")
    return this.uploadClient.send(
            UploadTopics.UPLOAD_ARTIFACT,
            data
        )
  }

  uploadManifest(@UploadedFile() file: Express.Multer.File, body: UploadManifestDto){
    this.logger.log("Upload Manifest")
    const manifest = JSON.parse(file.buffer.toString('utf8'))
    manifest['uploadToken'] = body.uploadToken;
    return this.uploadClient.send(
      UploadTopics.UPLOAD_MANIFEST,
      manifest
    );
  }
  updateUploadStatus(updateUploadStatusDto: UpdateUploadStatusDto){
    this.logger.log(`Update Upload status for id: ${updateUploadStatusDto.catalogId}`)
    return this.uploadClient.send(
      UploadTopics.UPDATE_UPLOAD_STATUS,
      updateUploadStatusDto
    )
  }
  
  getLastVersion(params: {projectId: number}): Observable<{}>{
    return this.uploadClient.send(
      UploadTopics.LAST_VERSION,
      params
    )
  }

  checkHealth() {
    return this.uploadClient.send(UploadTopics.CHECK_HEALTH, {})
  }

  async onModuleInit() {
    this.uploadClient.subscribeToResponseOf(Object.values(UploadTopics));
    await this.uploadClient.connect();
  }

}
