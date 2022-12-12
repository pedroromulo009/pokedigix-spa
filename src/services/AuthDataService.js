import http from '../http-commons';

class AuthDataService {

    async cadastrar(usuario) {
        let resposta = await http.post ('/auth/singup' , usuario);
        return resposta.data;

    }
}

export default new AuthDataService();
