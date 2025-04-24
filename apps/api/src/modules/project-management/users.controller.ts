import { Body, Controller, Post, Logger, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { USERS } from "@app/common/utils/paths";
import { ProjectManagementService } from "./project-management.service";
import { MemberResDto } from "@app/common/dto/project-management";
import { UserContextInterceptor } from "../../utils/interceptor/user-context.interceptor";
import { UserSearchDto } from "@app/common/oidc/oidc.interface";


@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(UserContextInterceptor)
@Controller(USERS)
export class UsersController {

  private readonly logger = new Logger(UsersController.name);
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ type: [MemberResDto] })
  getAllUsers(@Body() params: UserSearchDto) {
    return this.projectManagementService.getAllUsers(params);
  }

}