// app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";

import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
    const authUser = await auth(); // ✅ Add "await" to resolve the Promise
    console.log("Auth User:", authUser); // Debugging

    if (!authUser || !authUser.userId) {
        throw new Error("Unauthorized - User not authenticated");
    }
    return { userId: authUser.userId };
};




// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    statusImage: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 }
    })
        .middleware(handleAuth)
        .onUploadComplete(({ metadata, file }) => { 
            console.log("Upload complete!", { metadata, file });
        }),

    messageFile: f(["image", "pdf", "text"])
        .middleware(handleAuth)
        .onUploadComplete(({ metadata, file }) => { 
            console.log("Upload complete!", { metadata, file });
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;