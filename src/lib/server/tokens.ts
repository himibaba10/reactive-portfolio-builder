import "server-only";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { serverConfig } from "@/lib/server/config";

export type SessionPayload = {
  sub: string;
};

export function signSession(userId: string) {
  return jwt.sign({ sub: userId } satisfies SessionPayload, serverConfig.jwtSecret, {
    expiresIn: serverConfig.sessionMaxAgeSec,
  });
}

export function verifySession(token: string): SessionPayload {
  return jwt.verify(token, serverConfig.jwtSecret) as SessionPayload;
}

export function createOpaqueToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashOpaqueToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
