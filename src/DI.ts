
// TODO: Implement a more robust Dependency Injection solution

import Logger from "./providers/Logger";
import UserService from "./providers/UserService";
import JwtService from "./providers/JwtService";
import Mail from "./providers/Mail";

const deps = {
  logger: new Logger,
  userService: new UserService,
  jwtService: new JwtService,
  mail: new Mail,
};

export default deps;
