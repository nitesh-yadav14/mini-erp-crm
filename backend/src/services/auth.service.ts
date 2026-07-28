import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { generateToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

export class AuthService {

  async register(data: {
    name: string;
    email: string;
    password: string;
    role?: Role;
  }) {

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (existingUser) {
      throw new ApiError(
        400,
        "User already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    const user =
      await prisma.user.create({

        data: {

          name: data.name,

          email: data.email,

          password: hashedPassword,

          role: data.role ?? Role.ADMIN,

        },

      });

    const token =
      generateToken(
        user.id,
        user.role
      );

    return {

      token,

      user: {

        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role,

      },

    };

  }

  async login(
    email: string,
    password: string
  ) {

    const user =
      await prisma.user.findUnique({

        where: {
          email,
        },

      });

    if (!user) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    const token =
      generateToken(
        user.id,
        user.role
      );

    return {

      token,

      user: {

        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role,

      },

    };

  }

}

export default new AuthService();