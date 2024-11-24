import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";
import { v4 as uuidv4 } from "uuid";  // Import uuid

export const fetchUserData = async (): Promise<User[]> => {
    try {
      const snapshot = await db.ref("USERS").once("value");
      const users = snapshot.val();
      console.log("Fetched users:", users);  // Log fetched data for debugging
      return users ? Object.values(users) : [];
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch users");
    }
  };
  

export const getUserById = async (id: string): Promise<User | null> => {
    const snapshot = await db.ref(`USERS/${id}`).once("value");
    const user = snapshot.val();
    return user ? user : null; // Jika user tidak ada, return null
  };



export const updateUserData = async (id: string, user: User): Promise<void> => {
    await db.ref(`USERS/${id}`).set(user);
  };
  
  


export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    try {

      const newUserId = uuidv4(); 
  

      const newUser = {
        id: newUserId,  // Assign UUID to id
        name: user.name,  
        email: user.email,
        age: user.age,
      };
  

      const newUserRef = db.ref("USERS").child(newUserId); 
      await newUserRef.set(newUser); 
  
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  };