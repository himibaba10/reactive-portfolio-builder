import "server-only";
import { v2 as cloudinary } from "cloudinary";
import { serverConfig } from "@/lib/server/config";

export function isCloudinaryConfigured() {
  return Boolean(
    serverConfig.cloudinaryCloudName &&
      serverConfig.cloudinaryApiKey &&
      serverConfig.cloudinaryApiSecret,
  );
}

function ensureConfigured() {
  if (!isCloudinaryConfigured()) {
    throw Object.assign(
      new Error(
        "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
      ),
      { status: 503 },
    );
  }

  cloudinary.config({
    cloud_name: serverConfig.cloudinaryCloudName,
    api_key: serverConfig.cloudinaryApiKey,
    api_secret: serverConfig.cloudinaryApiSecret,
    secure: true,
  });
}

export type UploadedImage = {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
};

export async function uploadImageBuffer(
  buffer: Buffer,
  {
    folder,
    filename,
  }: {
    folder: string;
    filename?: string;
  },
): Promise<UploadedImage> {
  ensureConfigured();

  const result = await new Promise<{
    secure_url: string;
    public_id: string;
    width?: number;
    height?: number;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: false,
        unique_filename: true,
        use_filename: Boolean(filename),
        filename_override: filename,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, uploaded) => {
        if (error || !uploaded) {
          reject(error || new Error("Upload failed"));
          return;
        }
        resolve(uploaded as {
          secure_url: string;
          public_id: string;
          width?: number;
          height?: number;
        });
      },
    );
    stream.end(buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

export async function destroyImage(publicId: string) {
  if (!publicId || !isCloudinaryConfigured()) return;
  ensureConfigured();
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (err) {
    console.error("[cloudinary] destroy failed", err);
  }
}
