const Employer = require('../models/Employer');

const employerController = {
  // Controller function to handle employer signup
  signup: async (req, res, next) => {
    const { companyName, companyAddress, ranking, restaurantTypes } = req.body;

    try {
      const newEmployer = await Employer.create({
        companyName,
        companyAddress,
        ranking,
        restaurantTypes,
      });

      console.log('New employer:', newEmployer);
      res.status(201).json(newEmployer);
    } catch (error) {
      console.log('An error occurred creating the employer:', error);
      next(error);
    }
  },

  // Controller function to update employer profile
  updateProfile: async (req, res, next) => {
    const { id } = req.params;
    const { companyName, companyAddress, ranking, restaurantTypes } = req.body;

    try {
      const updatedEmployer = await Employer.findByIdAndUpdate(
        id,
        { companyName, companyAddress, ranking, restaurantTypes },
        { new: true }
      );

      if (!updatedEmployer) {
        return res.status(404).json({ message: 'Employer not found' });
      }

      res.json(updatedEmployer);
    } catch (error) {
      console.log('An error occurred updating the employer:', error);
      next(error);
    }
  },

  // Add more controller functions as needed...
};

module.exports = employerController;
