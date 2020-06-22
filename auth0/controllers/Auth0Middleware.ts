import { BaseController, useService } from "@cbto/rest-helper";
import { IAuth0Service } from "../characteristic/services/IAuth0Service";
import { generalMiddleware } from "@cbto/rest-helper/dist/lib/module-decorators/controller";
import { IUserFromAccessToken } from "../characteristic/model/IUserFromAccessToken";
import _ from "lodash";
import { IIncludingUserInfo } from "../characteristic/model/IIncludingUserInfo";

export class Auth0Middleware extends BaseController {

    @generalMiddleware('*')
    public authorized(req: { headers: { authorization: string }, body: any }): Promise<boolean> {
        const auth0 = useService<IAuth0Service>(IAuth0Service);

        return new Promise<boolean>((resolve, reject) => {
            if (
                req.headers &&
                req.headers.authorization &&
                req.headers.authorization.indexOf("Bearer ") > -1
            ) {
                auth0.isAuthenticated(req.headers.authorization.split(' ')[1]).then((userInfo) => {
                    req.body = _.assign(req.body as IIncludingUserInfo, { __userInfo: userInfo });

                    resolve(true);
                }).catch((err) => {
                    reject({
                        status: 401,
                        msg: JSON.stringify(err)
                    })
                });
            } else {
                reject({
                    status: 401,
                    msg: 'Not authorized.'
                })
            }
        });
    }
}
