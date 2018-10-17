
import User from "../models/user";

class UserService {
    static async getByEmail (email) {

        let userData = await User.findOne({ 'username': email });

        return userData;
    }

    static async register (user, pass) {

        let account = await User.register(new User(user), pass);

        return account;
    }
}
export default UserService;