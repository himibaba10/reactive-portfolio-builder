import { NextResponse } from "next/server";
import { requireSessionUser } from "@/lib/server/auth";
import {
  destroyImage,
  isCloudinaryConfigured,
  uploadImageBuffer,
} from "@/lib/server/cloudinary";
import { clientIp, handleRouteError, rateLimit } from "@/lib/server/http";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  try {
    const user = await requireSessionUser();
    const limited = await rateLimit(
      `upload:${user._id.toString()}:${clientIp(request)}`,
      30,
      15 * 60 * 1000,
    );
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many uploads" }, { status: 429 });
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error:
            "Image uploads are not configured. Add Cloudinary env vars.",
        },
        { status: 503 },
      );
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, or GIF images are allowed" },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image must be 5MB or smaller" },
        { status: 400 },
      );
    }

    const replacePublicId = String(form.get("replacePublicId") || "");
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImageBuffer(buffer, {
      folder: `reactive/${user._id.toString()}`,
      filename: file.name,
    });

    if (replacePublicId && replacePublicId !== uploaded.publicId) {
      void destroyImage(replacePublicId);
    }

    return NextResponse.json({
      url: uploaded.url,
      publicId: uploaded.publicId,
      width: uploaded.width,
      height: uploaded.height,
    });
  } catch (err) {
    return handleRouteError(err);
  }
}

export async function DELETE(request: Request) {
  try {
    await requireSessionUser();
    const body = (await request.json().catch(() => ({}))) as {
      publicId?: string;
    };
    if (!body.publicId) {
      return NextResponse.json({ error: "publicId required" }, { status: 400 });
    }
    await destroyImage(body.publicId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err);
  }
}
