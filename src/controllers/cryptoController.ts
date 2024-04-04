import { Request, Response } from 'express';
import axios from 'axios';

function encryptVigenere(text: string, key: string): string {
    text = text.toUpperCase();
    key = key.toUpperCase();

    let encryptedText = '';
    let count = 0;
    for(let i=0; i<text.length; i++) {
        const charCode = text.charCodeAt(i);
        if(charCode < 65 || charCode > 90){
            encryptedText += text.charAt(i);
            // continue;
        }
        encryptedText += String.fromCharCode(((charCode - 65 + (key.charCodeAt(count % key.length) - 65)) % 26) + 65);
        count++;
    }
    return encryptedText;
}

function generateRandomKey(length: number) : string{
    let key = '';
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const charactersLength = characters.length;

    for(let i=0;i<length;i++){
        key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return key;
}

export async function encrypt(req: Request, res: Response): Promise<void> {
    try{
        const plainText = "In shadows deep, secrets keep, Locked away from prying eyes. Through ciphered code, the truth shall seep, Unravel the mystery, and claim your prize. With the key I provide, decrypt the text,And reveal the message, long kept in jest.But heed my warning, lest you perplex,For only the wise shall pass this test."
        const key = generateRandomKey(5);

        const encryptedText = encryptVigenere(plainText, key);
        res.status(200).json({key, encryptedText});
    } catch (err:any) {
        console.log('Error in encryption', err);
        res.status(400).send(`An error occurred while trying to encrypt the message: ${err}`);
    }   
}

export function verify(req: Request, res: Response): void{
    try{
        console.log(req.body);
        const {decryptedText, key, encryptedText} = req.body;
        if(!decryptedText || !encryptedText || !key){
            console.log('Feilds are missing from request');
        }
        const encryptedTextFromDecrypted = encryptVigenere(decryptedText, key);
        if(encryptedText === encryptedTextFromDecrypted){
            res.status(200).json({message:'The provided information is correct'})
        } else {
            res.status(400).json("The provided information is incorrect");
        }

    } catch(error: any){
        console.log("Verification failed", error);
        res.status(500).send("Internal server error");
    }

}