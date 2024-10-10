import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body)
        const user = await newUser.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).json(error)
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
};

// Optionally, add DELETE and EDIT functions
