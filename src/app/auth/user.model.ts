export class User {

    constructor(public email: string, public id: string, private $token: string, private $expiresIn: Date) {}

    get token() {
        if (new Date() > this.$expiresIn) {
            return null;
        }
        return this.$token;
    }
}
