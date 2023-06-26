export default {
    server:{
        port:process.env.PORT || 8000,
    },
    keys:{
        jwt:process.env.JWT_KEY || "your jwt key",
        session:process.env.SESSION_KEY || "your session key"
    },
    oAuth:{
        google:{
            id:process.env.GOOGLE_ID || "your google id",
            secret:process.env.GOOGLE_SECRET || "your google secret"
        },
        github:{
            id:process.env.GITHUB_ID || "your github id",
            secret:process.env.GITHUB_SECRET || "your github secret"
        }
    },
    db:{
        default:process.env.MONGO_URL || "mongodb://localhost:27017/devmingle"
    }
}
