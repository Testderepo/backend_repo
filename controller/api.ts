import { Request, Response, RequestHandler } from "express";
import {
  fetchUserData,
  updateUserData,
  createUser,
  getUserById
} from "../repository/userCollection";
import { User } from "../entities/user";


export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await fetchUserData();
    res.status(200).json({
      status: "success",
      message: "Success Get Data",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getingUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      if (user) {
        res.status(200).json({
          status: "success",
          message: "Success Get User",
          data: user,
        });
      } else {
        res.status(404).json({
          error: "User not found",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  };

  export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user: User = req.body;
  
      const existingUser = await getUserById(id);  
      if (!existingUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }
  
      await updateUserData(id, user);
  
      const updatedUser = await getUserById(id);
      res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  };
  
  

export const createNewUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name, email, age }: { name: string; email: string; age: number } =
        req.body;
  
      if (!name || !email || !age) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }
  
      const newUser = await createUser({ name, email, age });
  
      res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: newUser,
      });
      return;
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
      return;
    }
  };
  
