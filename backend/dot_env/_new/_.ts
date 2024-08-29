import dotenv from "dotenv";

export function GetNewKey(): string | undefined {
    dotenv.config();
    return process.env.NEW_KEY;
}