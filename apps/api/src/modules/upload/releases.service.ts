import { Injectable, Logger } from "@nestjs/common";


@Injectable()
export class ReleasesService {
  private readonly logger = new Logger(ReleasesService.name)

  constructor(){}
}