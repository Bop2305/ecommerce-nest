import { User } from "../../user/user.entity"

type ResponseDatLogin = {
    user: Partial<User>
    accessToken: string,
    refreshToken: string
}

export default ResponseDatLogin