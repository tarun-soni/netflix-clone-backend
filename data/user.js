import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("1212", 10),
  },
  {
    name: "User One",
    email: "u1@example.com",
    password: bcrypt.hashSync("1212", 10),
  },
  {
    name: "User Two",
    email: "u2@example.com",
    password: bcrypt.hashSync("1212", 10),
  },
];

export default users;
