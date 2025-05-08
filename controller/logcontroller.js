
// logcontroller.js
import logModel from "../model/logmodel.js";

 // logcontroller.js
export const createLog = async (req, res) => {
  try {
    const logCustomer = new logModel(req.body);
    await logCustomer.save();
    res.json(logCustomer); // Return the saved log
  } catch (error) {
    console.error("Error creating log:", error); // Log the error on the server
    res.status(500).json({ message: "Error creating log", error: error.message });
  }
};

export const fatchLog = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const logs = await logModel.find()
      .populate("customer")  // 👈 important to show customer details
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await logModel.countDocuments();

    res.json({
      logs,
      total: count,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

export const fatchLogById = async (req, res) => {
  try {
    const log = await logModel.findById(req.params.id);
    if (!log) return res.json({ message: "Log not found" });
    res.json(log);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const UpdateLog = async (req, res) => {
  try {
    const log = await logModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!log) return res.status(404).json({ message: "Update not working" });
    res.json(log);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const DeleteLog = async (req, res) => {
  try {
    const log = await logModel.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found or already deleted" });
    res.json({ message: "Log deleted successfully", log });
  } catch (error) {
    res.status(500).json(error);
  }
};
