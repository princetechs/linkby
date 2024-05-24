import { auth } from "../auth"
import { SignIn } from "./SignIn"
 
export default async function UserAvatar() {
  const session = await auth()

  if (!session?.user || !session.user.image) return null


  return (
    <div>

      {session.user.name}
      <img src={session.user.image} alt="User Avatar" />
    </div>
  )
}