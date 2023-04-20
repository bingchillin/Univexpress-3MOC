db.createUser({
    user: "admin",
    pwd: passwordPrompt(),
    roles: [
        {
            role: "readWrite",
            db: "maquettes"
        }
    ]
});

db.createCollection("maquettes");