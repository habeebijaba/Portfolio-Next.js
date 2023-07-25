import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request) {
    const formData = await request.formData();

    const file = formData.get("file");
    if (!file) {
        return NextResponse.json(
            { error: "File blob is required." },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads`
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
        await stat(uploadDir);
    } catch (e) {
        if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error(
                "Error while trying to create directory when uploading a file\n",
                e
            );
            return NextResponse.json(
                { error: "Something went wrong." },
                { status: 500 }
            );
        }
    }

    try {

        const filename = `${Date.now()}${file.name}`

        await writeFile(`${uploadDir}/${filename}`, buffer);
        return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` });
    } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}