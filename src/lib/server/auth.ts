import { connectDb } from '@/lib/db/connect';
import { User, type UserDocument } from '@/lib/db/models/user';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import 'server-only';

export function publicUser(user: UserDocument) {
  return {
    id: user._id.toString(),
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
}

function primaryEmail(clerkUser: {
  primaryEmailAddressId: string | null;
  emailAddresses: {
    id: string;
    emailAddress: string;
    verification?: { status?: string | null } | null;
  }[];
}) {
  const primary =
    clerkUser.emailAddresses.find(
      (entry) => entry.id === clerkUser.primaryEmailAddressId,
    ) ?? clerkUser.emailAddresses[0];
  return primary ?? null;
}

function isClerkEmailVerified(clerkUser: {
  emailAddresses: {
    verification?: { status?: string | null } | null;
  }[];
}) {
  return clerkUser.emailAddresses.some(
    (entry) => entry.verification?.status === 'verified',
  );
}

async function upsertLocalUser(
  clerkId: string,
  email: string,
  isEmailVerified: boolean,
): Promise<UserDocument | null> {
  await connectDb();

  const softDeleted = await User.findOne({
    clerkId,
    deletedAt: { $ne: null },
  });
  if (softDeleted) return null;

  const user = await User.findOne({ clerkId, deletedAt: null });
  if (user) {
    let dirty = false;
    if (user.email !== email) {
      user.email = email;
      dirty = true;
    }
    if (user.isEmailVerified !== isEmailVerified) {
      user.isEmailVerified = isEmailVerified;
      dirty = true;
    }
    if (dirty) await user.save();
    return user;
  }

  const emailTaken = await User.findOne({ email, deletedAt: null });
  if (emailTaken) {
    if (emailTaken.clerkId && emailTaken.clerkId !== clerkId) {
      return null;
    }
    emailTaken.clerkId = clerkId;
    emailTaken.isEmailVerified = isEmailVerified;
    await emailTaken.save();
    return emailTaken;
  }

  return User.create({
    clerkId,
    email,
    isEmailVerified,
  });
}

export async function getSessionUser(): Promise<UserDocument | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const emailEntry = primaryEmail(clerkUser);
  if (!emailEntry?.emailAddress) return null;

  return upsertLocalUser(
    userId,
    emailEntry.emailAddress.toLowerCase(),
    isClerkEmailVerified(clerkUser),
  );
}

export async function requireSessionUser(): Promise<UserDocument> {
  const user = await getSessionUser();
  if (!user) {
    throw Object.assign(new Error('Unauthorized'), { status: 401 });
  }
  return user;
}

export async function banClerkUser(clerkId: string) {
  const client = await clerkClient();
  await client.users.banUser(clerkId);
}

export function jsonError(message: string, status: number, extra?: object) {
  return NextResponse.json({ error: message, ...extra }, { status });
}
