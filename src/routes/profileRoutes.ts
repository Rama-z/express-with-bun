import MainRoutes from "./mainRoutes";

import { isLogin } from "../middleware/isLogin";
import zodValidator from "../middleware/validator";
import ProfileController from "../controller/profileController";
import ProfileValidatorScheme from "../helpers/validatorScheme/profileValidatorScheme";

class ProfileRouters extends MainRoutes {
  public routes(): void {
    this.router.get("/", isLogin, ProfileController.getProfileInfo);
    this.router.put(
      "/edit",
      isLogin,
      zodValidator(ProfileValidatorScheme.editProfileScheme),
      ProfileController.editProfileInfo
    );
  }
}

export default new ProfileRouters().router;
