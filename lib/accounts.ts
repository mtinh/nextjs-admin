import "server-only";
import { db } from "@/lib/mongodb";
import type { SessionUser } from "@/lib/jwt";

type Account = SessionUser & { password: string };

const accounts = db.collection<Account>("accounts");

export function findAccountByUsername(username: string) {
    return accounts.findOne({ username });
}

export function findAccountById(id: number) {
    return accounts.findOne({ id });
}

export function toSessionUser({ id, firstname, lastname, username, role }: Account): SessionUser {
    return { id, firstname, lastname, username, role };
}