import { Guid } from 'guid-typescript';
import { Validator } from 'validator.ts/Validator';
import { MinLength, IsInt, IsFloat } from 'validator.ts/decorator/Validation';

export class User {
    uid = Guid.raw();
    @MinLength(1)
    username = '';
    @MinLength(1)
    firstname = '';
    @MinLength(1)
    lastname = '';
    accounts = new Array<Role>();
    validate() {
        const errors = new Validator().validate(this);
        console.log('Invalid user : errors=', JSON.stringify(errors));
        return errors.length === 0;
    }
}

export class Role {
    rights = new Array<Right>();
    constructor(rights) {
        this.rights = rights;
    }
}

export class Right {
    rights = new Array<String>();
}

export class Item {
    label: string;
    value: string;
}

export enum STATUS {
    SENT = 'SENT',
    PENDING = 'PENDING',
    SENDING = 'SENDING',
    ERROR = 'ERROR'
}

export class Status {
    status = STATUS.PENDING;
}
