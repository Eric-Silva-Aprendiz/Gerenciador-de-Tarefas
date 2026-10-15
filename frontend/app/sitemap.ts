import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap{
    return[
        {
            url: process.env.NEXTAUTH_URL+"/sobre" || "https://localhost:3001",
            lastModified: new Date(),
        },
        {
            url: process.env.NEXTAUTH_URL || "https://localhost:3001/sobre",
            lastModified: new Date(),
        }
    ]
}