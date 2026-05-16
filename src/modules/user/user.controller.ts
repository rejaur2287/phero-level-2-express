import type { Request, Response } from "express";

import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  //   const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);
    // console.log(result);

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserFromDB(id as string);
    if (result.rows.length === 0) {
      // Found as a solution that does'nt crash node server
      // return res.status(500).json({
      //   success: false,
      //   message: "User is not found in DB.",
      //   data: {},
      // });
      res.status(404).json({
        success: false,
        message: "User not found in DB.",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `User ${id} retrieved successfully.`,
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateAnUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { name, password, age, is_active } = req.body;

  try {
    const result = await userService.updateAnUserInDB(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found in DB.",
      });
    }
    res.status(200).json({
      success: true,
      message: `User ${id} updated successfully.`,
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
  // console.log(result);
  // console.log(id);
  // console.log({ name, password, age, is_active });
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as string);
    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found in DB.",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `User ${id} deleted successfully.`,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateAnUser,
  deleteUser,
};
