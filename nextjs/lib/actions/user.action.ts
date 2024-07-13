"use server"
import connectToDb from "@/lib/mongodb";
import User from "@/lib/models/user.model";
import { UserType } from "@/lib/models/user.model";
import {hashPassword} from "@/lib/isValidPassword";

export async function createUser(userData: UserType) {

    const hashedPassword = await hashPassword(userData.password);


    try {
        await connectToDb();
        console.log(User);

        const user = await User.create({
            name: {
                firstName: userData.name.firstName,
                lastName: userData.name.lastName
            },
            email: userData.email,
            password: hashedPassword,
            address: userData.address,
            phone: userData.phone,
            billingMethod: userData.billingMethod,
        });

        console.log(user);
    } catch (error: any) {
        console.log(error.message);

    }
};

export async function fetchAllUsers() {
    try {
        await connectToDb();
        // Use .lean() for faster performance as it returns plain JavaScript objects instead of Mongoose documents.
        const users = await User.find().lean();
        return users.map(user => {
            // Optionally, if you want to convert _id to a string or perform other transformations:
            user.id = user._id.toString();
            user.createdAt = user.createdAt.toLocaleString();
            user.updatedAt = user.updatedAt.toLocaleString();
            // delete user._id;
            console.log(users);
            
            return user;
        });
    } catch (error: unknown) {
        console.error('Error fetching all users:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}

export async function updateUser(userData: UserType): Promise<UserType | null> {

    try {
        await connectToDb();

        const updatedUser = await User.findOneAndUpdate({ email: userData.email }, {
            name: {
                firstName: userData.name.firstName,
                lastName: userData.name.lastName
            },
            email: userData.email,
            address: userData.address,
            phone: userData.phone,
            billingMethod: userData.billingMethod,
        }, { new: true });
        
        return updatedUser
    }
    catch (error: unknown) {
        console.error('Error updating user:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }

}


export async function getUserByEmail(email: string): Promise<UserType | null> {
    try {
        await connectToDb();
        const user = await User.findOne({ email });
        return user;
        
    } catch (error: unknown) {
        console.error('Error fetching user by email:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}

export async function getUserById(id: string): Promise<UserType | null> {
    try {
        await connectToDb();
        const user = await User.findById(id);
        if (user) {
            // If user is found, transform the user object as needed:
            user.id = user._id.toString();
            user.createdAt = user.createdAt.toLocaleString();
            user.updatedAt = user.updatedAt.toLocaleString();
            // delete user._id;
            console.log(user);
            
            return user;
        }
        return null
    } catch (error: unknown) {
        console.error('Error fetching user by id:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}

export async function deleteUser(email: string): Promise<boolean> {
    try {
        await connectToDb();
        const user = await User.findByIdAndDelete(email);
        return !!user;
        
    } catch (error: unknown) {
        console.error('Error deleting user:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }  
}

