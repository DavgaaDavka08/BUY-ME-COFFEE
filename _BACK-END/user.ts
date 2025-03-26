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
      avatarImage: "/Users/24LP1757/Desktop/coffee.jpg",
      successMessage: "amjilttai",
      backgroundImage: "",
    },
  ];
};
export default User;
