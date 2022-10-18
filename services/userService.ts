import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { sign, signrefresh } from '../helpers/jwt';
import '../config/database';
import User from '../models/userModel';
import IUser from '../interfaces/IUser';

export const getUsersAll = async () => {
    try{
        return await User.find({});
    }catch(error){
        return error;
    }
};

export const getUserById = async (id: string) => {
    try{
        return await User.findById({_id: id});
    }catch(error){
        return error;
    }
};

export const postUser = async (user:IUser) => {
    try{
        const { firstname, lastname, email, username, password } = user;

        if (await User.exists({username})) {
            return `The username ${username} is not repit`;
        }
        if (await User.exists({email})) {
            return `The email ${email} is not repit`;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const userCreate = await User.create({
            firstname,
            lastname,
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const accesstoken = await sign(userCreate);
        const refreshtoken = await signrefresh(userCreate);

        userCreate.accesstoken = accesstoken;
        userCreate.refreshtoken = refreshtoken;

        return await userCreate.save();

    }catch(error){
        return error;
    }
};

export const putUser = async (user:IUser) => {
    try{
        const { id, firstname, lastname, email, username, password } = user;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await User.exists({username})) {
            return `The username ${username} is not repit`;
        }
        if (await User.exists({email})) {
            return `The email ${email} is not repit`;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const accesstoken = await sign(user);
        const refreshtoken = await signrefresh(user);

        const newUser = { firstname, lastname, email, username, password: encryptedPassword, accesstoken, refreshtoken, _id: id };

        return await User.findByIdAndUpdate(id, newUser, { new: true });

    }catch(error){
        return error;
    }
};

export const loginUser = async (user:IUser) => {
    try{
        const { username, password } = user;

        const userLogin = await User.findOne({ username });

        if (userLogin && (await bcrypt.compare(password, userLogin.password))) {

            const accesstoken = await sign(userLogin);
            const refreshtoken = await signrefresh(userLogin);

            userLogin.accesstoken = accesstoken;
            userLogin.refreshtoken = refreshtoken;

            await userLogin.save();

            return {
                userId: userLogin._id,
                firstname: userLogin.firstname,
                lastname: userLogin.lastname,
                username: userLogin.username,
                email: userLogin.email,
                status: userLogin.status,
                accesstoken: userLogin.accesstoken,
                refreshtoken: userLogin.refreshtoken
            };
        }

        return "Invalid Credentials";

      } catch (error) {
        return error;
      }
}

export const loginRefreshUser = async (refreshtoken:string) => {
    try {
        const user = await User.findOne({ refreshtoken });

        if (user !== null) {
            const accesstoken = await sign(user);

            user.accesstoken = accesstoken;

            await user.save();
            return { accesstoken: user.accesstoken };
        }

        return "Invalid Refresh Token";

    } catch (error) {
        return error;
    }
}

export const delUser = async (id: string) => {
    try{
        return await User.findByIdAndDelete({_id: id});
    }catch(error){
        return error;
    }
};
