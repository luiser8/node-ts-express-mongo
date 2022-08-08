import { Request, Response } from "express";
import { delUser, getUserById, getUsersAll, loginUser, postUser, putUser } from "../services/userService";

export const getAll = async (_req: Request, res: Response) => {
    try{
        const users = await getUsersAll();
        res.status(200).json(users)
    }catch(error: any){
        res.status(404).json({error:error.message});
    }
}

export const getById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const user = await getUserById(id);
        res.status(200).json(user)
    }catch(error: any){
        res.status(404).json({error:error.message});
    }
}

export const post = async (req: Request, res: Response) => {
    try{
        const user = await postUser(req.body);
        res.status(201).json(user);
    }catch(error: any){
        res.status(409).json({error:error.message});
    }
}

export const put = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        if (!(id)) {
            return res.status(400).send("Id for put is required");
        }

        const user = await putUser(req.body);

        res.status(201).json(user);
    }catch(error: any){
        res.status(409).json({error:error.message});
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const user = await loginUser(req.body);

        if(user === "Invalid Credentials"){
            res.status(200).send(user);
        }else{
            res.status(200).json(user);
        }

    }catch(error: any){
        res.status(409).json({error:error.message});
    }
};

export const del = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        if (!(id)) {
            res.status(400).send("Id User is required");
        }

        await delUser(id);

        res.status(202).json(id);
    }catch(error: any){
        res.status(409).json({error:error.message});
    }
}
