const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

// GET all employees (with department info)
router.get("/", async (req, res, next) => {
  try {
    const employees = await Employee.find()
      .populate("department", "name")
      .sort({ lastName: 1, firstName: 1 });
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// GET single employee by id
router.get("/:id", async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id).populate(
      "department",
      "name"
    );
    if (!emp) return res.status(404).json({ error: "Employee not found" });
    res.json(emp);
  } catch (err) {
    next(err);
  }
});

// CREATE employee
router.post("/", async (req, res, next) => {
  try {
    const emp = new Employee(req.body);
    const saved = await emp.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// UPDATE employee
router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Employee not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE employee
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
