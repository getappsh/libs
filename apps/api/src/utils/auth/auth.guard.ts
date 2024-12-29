import { ExecutionContext, HttpException, HttpStatus, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as ckAuthGuard, KeycloakConnectConfig } from 'nest-keycloak-connect';
import * as KeycloakConnect from 'keycloak-connect';
import { KeycloakMultiTenantService } from 'nest-keycloak-connect/services/keycloak-multitenant.service';
import { Request, Response, } from 'express';
import { TLSSocket } from 'tls';
import { Unprotected } from '../sso/sso.decorators';
import { ConfigService } from '@nestjs/config';



export class AuthGuard extends ckAuthGuard {
  ref: Reflector
  constructor(singleTenant: KeycloakConnect.Keycloak, keycloakOpts: KeycloakConnectConfig, logger: Logger, multiTenant: KeycloakMultiTenantService, reflector: Reflector) {
    super(singleTenant, keycloakOpts, logger, multiTenant, reflector)
    this.ref = reflector
  };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const socket = request.socket as TLSSocket;
    const isUnprotected = this.ref.getAllAndOverride("out-of-auth", [context.getHandler(), context.getClass()])
    if ((socket.authorized && request.header("auth_type") && request.header("auth_type") == "CC") || isUnprotected) { // CC stands for client certificates
      if (request.header("integration_test") === "true") {
        request["user"] = {
          // realm_access: { roles: ["agent"] },
          given_name: "integration",
          family_name: "test",
          email: "integraion@test.com"
        }
      }
      return true
    }
    else {
      if (request.header("Authorization")) {
        return await super.canActivate(context);
      } else if (request.header("Device-Auth") && request.header("Device-Auth") === (process.env.DEVICE_AUTH ?? process.env.DEVICE_SECRET)) {
        return true;
      } else {
        throw new UnauthorizedException({ message: socket.authorizationError || "unknown error" })
      }
    }
  }
}


