import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SHA256, AES, enc, mode, pad } from 'crypto-js';
import { IHelperHashService } from 'src/helpers/interfaces/helper.hash-service.interface';
import {
    IHelperJwtOptions,
    IHelperJwtVerifyOptions,
} from 'src/helpers/interfaces/helper.interface';

@Injectable()
export class HelperHashService implements IHelperHashService {

    randomSalt(length: number): string {
        return genSaltSync(length);
    }

    bcrypt(passwordString: string, salt: string): string {
        return hashSync(passwordString, salt);
    }

    bcryptCompare(passwordString: string, passwordHashed: string): boolean {
        return compareSync(passwordString, passwordHashed);
    }

    sha256(string: string): string {
        return SHA256(string).toString(enc.Hex);
    }

    sha256Compare(hashOne: string, hashTwo: string): boolean {
        return hashOne === hashTwo;
    }
    base64Encrypt(data: string): string {
        const buff: Buffer = Buffer.from(data, 'utf8');
        return buff.toString('base64');
    }

    base64Decrypt(data: string): string {
        const buff: Buffer = Buffer.from(data, 'base64');
        return buff.toString('utf8');
    }

    base64Compare(clientBasicToken: string, ourBasicToken: string): boolean {
        return ourBasicToken === clientBasicToken;
    }

    aes256Encrypt(
        data: string | Record<string, any> | Record<string, any>[],
        key: string,
        iv: string
    ): string {
        const cIv = enc.Utf8.parse(iv);
        const cipher = AES.encrypt(JSON.stringify(data), key, {
            mode: mode.CBC,
            padding: pad.Pkcs7,
            iv: cIv,
        });

        return cipher.toString();
    }

    aes256Decrypt(
        encrypted: string,
        key: string,
        iv: string
    ): string | Record<string, any> | Record<string, any>[] {
        const cIv = enc.Utf8.parse(iv);
        const cipher = AES.decrypt(encrypted, key, {
            mode: mode.CBC,
            padding: pad.Pkcs7,
            iv: cIv,
        });

        return JSON.parse(cipher.toString(enc.Utf8));
    }

    jwtEncrypt(
        payload: Record<string, any>,
        options: IHelperJwtOptions
    ): string {
        // return this.jwtService.sign(payload, {
        //     secret: options.secretKey,
        //     expiresIn: options.expiredIn,
        //     notBefore: options.notBefore ?? 0,
        //     audience: options.audience,
        //     issuer: options.issuer,
        //     subject: options.subject,
        // });
        return ''
    }

    jwtDecrypt(token: string): Record<string, any> {
        // return this.jwtService.decode(token) as Record<string, any>;
        return []
    }

    jwtVerify(token: string, options: IHelperJwtVerifyOptions): boolean {
        try {
            // this.jwtService.verify(token, {
            //     secret: options.secretKey,
            //     audience: options.audience,
            //     issuer: options.issuer,
            //     subject: options.subject,
            // });

            return true;
        } catch (err: unknown) {
            return false;
        }
    }
}