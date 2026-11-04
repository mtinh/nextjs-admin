import { SignJWT, jwtVerify } from "jose";

export type SessionUser = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    role: "ADMIN" | "USER";
};

const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

const ACCESS_SECONDS = 60;
const REFRESH_SECONDS = 7 * 24 * 60 * 60;

const baseCookie = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
} as const;

export const accessCookie = { ...baseCookie, maxAge: ACCESS_SECONDS };
export const refreshCookie = { ...baseCookie, maxAge: REFRESH_SECONDS };

export function signAccessToken(user: SessionUser) {
    return new SignJWT(user)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${ACCESS_SECONDS}s`)
        .sign(accessSecret);
}

export function signRefreshToken(id: number) {
    return new SignJWT()
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(String(id))
        .setIssuedAt()
        .setExpirationTime(`${REFRESH_SECONDS}s`)
        .sign(refreshSecret);
}

export async function verifyAccessToken(token?: string): Promise<SessionUser | null> {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, accessSecret, { algorithms: ["HS256"] });
        const { id, firstname, lastname, username, role } = payload as SessionUser;
        return { id, firstname, lastname, username, role };
    } catch {
        return null;
    }
}

export async function verifyRefreshToken(token?: string) {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, refreshSecret, { algorithms: ["HS256"] });
        return Number(payload.sub);
    } catch {
        return null;
    }
}