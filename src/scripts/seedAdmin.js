require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const adminEmail = "admin@gmail.com";
        
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await User.create({
            name: "Admin User",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        console.log(" Admin user created successfully");
        console.log("Email: admin@gmail.com");
        console.log("Password: admin123");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

seedAdmin();