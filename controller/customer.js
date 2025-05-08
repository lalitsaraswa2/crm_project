
// controllers/customerController.js

import CoustmerModel from "../model/custmermodel.js";
 

export const createcustomer = async (req, res) => {
  try {
    const customer = new CoustmerModel(req.body); 
    await customer.save();
    res.status(201).json(customer);  
  } catch (error) {
      res.status(500).json(error);
  }
};


  
export const fetchcustomer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const [coustmers , total ] = await Promise.all([
      CoustmerModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      CoustmerModel.countDocuments()
    ]);

    res.status(200).json({ coustmers, total });
  } catch (err) {
    console.error("Error fetching customers:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
  export const fetchcustomerById = async (req, res) => {
      try {
        const coustmer = await CoustmerModel.findById(req.params.id);
        if(!coustmer)
          return res.json(404).json({message:"coustmer not found"})
        res.json(coustmer)
   
      } catch (error) {
        res.status(500).json(error);
      }
  };
  export const updateCustomer = async (req, res) => {
    try {
      const customerUpdate = await CoustmerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!customerUpdate) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      res.json(customerUpdate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  export const deleteCustomer = async (req, res) => {
       try {
          const coustmerdelete = await CoustmerModel.findByIdAndDelete(req.params.id)
           if(!coustmerdelete)
               return res.status(404).json({message:"Coustmer not found"});
               res.json(coustmerdelete)
            
       } catch (error) {
        res.status(500).json({ error: error.message });
       }
  };
  