const express = require("express");
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const router = express.Router();

// GET all departments
router.get("/", async (req, res, next) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json(departments);
  } catch (err) {
    next(err);
  }
});

// GET single department by id
router.get("/:id", async (req, res, next) => {
  try {
    const dept = await Department.findById(req.params.id);
    if (!dept) return res.status(404).json({ error: "Department not found" });
    res.json(dept);
  } catch (err) {
    next(err);
  }
});

// CREATE department
router.post("/", async (req, res, next) => {
  try {
    const dept = new Department(req.body);
    const saved = await dept.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// UPDATE department
router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Department not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE department
router.delete("/:id", async (req, res, next) => {
  try {
    const count = await Employee.countDocuments({ department: req.params.id });
    if (count > 0) {
      return res.status(400).json({
        error: "Cannot delete department with assigned employees",
      });
    }

    const deleted = await Department.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Department not found" });
    res.json({ message: "Department deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
