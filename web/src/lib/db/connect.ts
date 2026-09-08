import "server-only";
import mongoose from "mongoose";
import { serverConfig } from "@/lib/server/config";

declare global {
  // eslint-disable-next-line no-var
  var __reactiveMongoose:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

const cached = global.__reactiveMongoose ?? {
  conn: null,
  promise: null,
};

global.__reactiveMongoose = cached;

export async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(serverConfig.mongoUri, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
