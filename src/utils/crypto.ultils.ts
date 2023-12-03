import { HttpException, HttpStatus } from "@nestjs/common"
import * as crypto from "crypto"

type CryptoHashParams = {
    algorithm?: string
    secret: string
    data: crypto.BinaryLike
    endcoding?: crypto.BinaryToTextEncoding
}

const cryptoHash = async ({ algorithm = 'sha256', secret, data, endcoding = 'hex' }: CryptoHashParams): Promise<string> => {
    try {
        const hashedValue = crypto
            .createHmac(algorithm, secret)
            .update(data)
            .digest(endcoding) as string

        return hashedValue
    } catch (error) {
        throw new HttpException('Failed to hash refresh token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export {
    cryptoHash
}