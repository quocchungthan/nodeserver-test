export abstract class IAuth0Service {
  abstract isAuthenticated(accessToken: string): Promise<boolean>;
}
