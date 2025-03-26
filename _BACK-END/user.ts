import { CoffeeType } from "../utils/Types";

const User = async (): Promise<CoffeeType[]> => {
  return [
    {
      id: "123",
      username: "davgaa",
      email: "dagaa@gmail.com",
      password: "1234",
    },
  ];
};
export default User;
