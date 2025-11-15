const mongoose = require("mongoose");
require("dotenv").config();

const Department = require("./models/Department");
const Employee = require("./models/Employee");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/apollonia";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    await Department.deleteMany({});
    await Employee.deleteMany({});

const departments = await Department.insertMany([
  { name: "General Dentistry", description: "Routine dental care and examinations" },
  { name: "Pediatric Dentistry", description: "Dental care for children and adolescents" },
  { name: "Restorative Dentistry", description: "Restoration of teeth and oral function" },
  { name: "Surgery", description: "Oral and maxillofacial surgical procedures" },
  { name: "Orthodontics", description: "Correction of teeth alignment and bite issues" },
  { name: "Periodontics", description: "Gum disease treatment" },
  { name: "Endodontics", description: "Root canal therapy" },
  { name: "Prosthodontics", description: "Implants, crowns & dentures" },
  { name: "Radiology", description: "Dental imaging & X-rays" },
  { name: "Hygiene", description: "Cleaning & preventive care" },
  { name: "Administration", description: "Office & operations" },
]);


await Employee.insertMany([
  {
    firstName: "Lisa",
    lastName: "Harris",
    email: "lisa.harris@apollonia.com",
    role: "Restorative Dentist",
    department: departments[2]._id,
  },
  {
    firstName: "Alfred",
    lastName: "Christensen",
    email: "alfred.christensen@apollonia.com",
    role: "General Dentist",
    department: departments[0]._id,
  },
  {
    firstName: "John",
    lastName: "Dudley",
    email: "john.dudley@apollonia.com",
    role: "General Dentist",
    department: departments[0]._id,
  },
  {
    firstName: "Danny",
    lastName: "Perez",
    email: "danny.perez@apollonia.com",
    role: "Restorative Dentist",
    department: departments[2]._id,
  },
  {
    firstName: "Sarah",
    lastName: "Alvarez",
    email: "sarah.alvarez@apollonia.com",
    role: "Pediatric Dentist",
    department: departments[1]._id,
  },
  {
    firstName: "Constance",
    lastName: "Smith",
    email: "constance.smith@apollonia.com",
    role: "Oral Surgeon",
    department: departments[3]._id,
  },
  {
    firstName: "Travis",
    lastName: "Combs",
    email: "travis.combs@apollonia.com",
    role: "Dental Assistant",
    department: departments[0]._id, // Not listed in chart, assigned logically
  },
  {
    firstName: "Francisco",
    lastName: "Willard",
    email: "francisco.willard@apollonia.com",
    role: "Pediatric Dentist",
    department: departments[1]._id,
  },
  {
    firstName: "Janet",
    lastName: "Doe",
    email: "janet.doe@apollonia.com",
    role: "General Dentist",
    department: departments[0]._id,
  },
  {
    firstName: "Leslie",
    lastName: "Roche",
    email: "leslie.roche@apollonia.com",
    role: "Orthodontist",
    department: departments[4]._id,
  }
]);


    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
