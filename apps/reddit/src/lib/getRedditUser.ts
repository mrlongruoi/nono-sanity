import { sanityFetch, addUser } from "@workspace/sanity-utils/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserById } from "@workspace/sanity-utils/groq/user/getUserById";

interface UserResult {
  _id: string;
  username: string;
  imageUrl: string;
  email: string;
}

const parseUsername = (username: string) => {
  // Remove whitespace and convert to camelCase with random number to avoid conflicts
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  // Convert whitespace to camelCase and add random number to avoid conflicts
  return (
    username
      .replaceAll(/\s+(.)/g, (_, char) => char.toUpperCase()) // Convert whitespace to camelCase
      .replaceAll(/\s+/g, "") + randomNum // Remove all whitespace and add random number
  );
};

export async function getUser(): Promise<UserResult | { error: string }> {
  try {
    console.log("Getting current user from Clerk");
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      console.log("No user logged in");
      return { error: "User not found" };
    }

    console.log(`Found Clerk user: ${loggedInUser.id}`);

    // Check if user exists in the database first
    console.log("Checking if user exists in Sanity database");
    const existingUser = await getUserById(loggedInUser.id);

    // If user exists, return the user data
    if (existingUser?._id) {
      console.log(`User found in database with ID: ${existingUser._id}`);
      const user = {
        _id: existingUser._id,
        username: existingUser.username!,
        imageUrl: existingUser.imageUrl!,
        email: existingUser.email!,
      };

      return user;
    }

    console.log("User not found in database, creating new user");
    // If user doesn't exist, create a new user
    const newUser = await addUser({
      id: loggedInUser.id,
      username: parseUsername(loggedInUser.fullName!),
      email:
        loggedInUser.primaryEmailAddress?.emailAddress ||
        loggedInUser.emailAddresses[0]?.emailAddress || "",
      imageUrl: loggedInUser.imageUrl,
    });

    console.log(`New user created with ID: ${newUser._id}`);
    const user = {
      _id: newUser._id,
      username: newUser.username!,
      imageUrl: newUser.imageUrl,
      email: newUser.email,
    };

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return { error: "Failed to get user" };
  }
}
