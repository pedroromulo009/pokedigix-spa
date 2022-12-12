export default class UsuarioRequest {

    constructor() {
        this.username = null,
        this.email = null,
        this.role = ["teinador"],
        this.password = null
    }

    populate(obj) {
        this.username = obj.username;
        this.email = obj.email;
        this.role = obj.role;
        this.password = obj.password;

    }

    toJson(obj) {
        return {
            username: this.username,
            email: this.email
            

        }
    }
}
