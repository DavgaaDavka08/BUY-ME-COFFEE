import CoffeeType from "../utils/Types";

const User = async (): Promise<CoffeeType[]> => {
  return [
    {
      id: "123",
      username: "davgaa",
      email: "dagaa@gmail.com",
      password: "1234",
      name: "davgaa",
      about: "hello world",
      socialMediaURL: "http://localhost:3000/api/coffee",
      avatarImage:
        "blob:http://localhost:3000/16abc3fd-ea60-4c43-907f-aea06067e571",
      successMessage: "amjilttai",
      backgroundImage: "",
    },
  ];
};
export default User;
