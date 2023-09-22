import MainRoutes from "./mainRoutes";
import zodValidator from "../middleware/validator";
import AuthController from "../controller/authController";
import AuthValidatorScheme from "../helpers/validatorScheme/authValidatorScheme";

class AuthRouters extends MainRoutes {
  public routes(): void {
    this.router.post(
      "/register",
      zodValidator(AuthValidatorScheme.registerScheme),
      AuthController.register
    );
    this.router.post("/login", AuthController.login);
  }
}

export default new AuthRouters().router;
