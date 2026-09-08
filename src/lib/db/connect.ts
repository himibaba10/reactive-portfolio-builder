import "server-only";
import mongoose from "mongoose";
import { serverConfig } from "@/lib/server/config";

declare global {
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
  if (cached.conn) {
    if (cached.conn.connection.readyState === 1) return cached.conn;
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose
      .connect(serverConfig.mongoUri, {
        bufferCommands: false,
      })
      .catch((err) => {
        cached.promise = null;
        cached.conn = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
