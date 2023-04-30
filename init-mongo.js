db.createUser({
    user: "admin",
    pwd: "admin",
    roles: [
        {
            role: "readWrite",
            db: "maquettes"
        }
    ]
});

db.createCollection("maquettes");

db.users.createIndex({"email": 1}, {unique: true});