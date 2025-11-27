import { getServerClient } from "../../clients/client.server";

export async function addUser({
  id,
  username,
  email,
  imageUrl,
}: {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
}) {
  const user = await getServerClient().createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    imageUrl,
    joinedAt: new Date().toISOString(),
  });

  return user;
}
