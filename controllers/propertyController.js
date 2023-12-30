const Property = require('../models/propertyModel');

const seedData = async (req, res) => {
  try {
    const properties = [
      // Define an array of property objects with fields like 'title', 'location', 'price', and 'type'
      { title: 'Property 1', location: 'Location 1', price: 1000, type: 'Type 1' },
      { title: 'Property 2', location: 'Location 2', price: 1500, type: 'Type 2' },
      // Add more properties as needed
    ];

    // Insert the property data into the database
    await Property.create(properties);

    // Respond with a success message
    res.status(201).json({ message: 'Properties seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const createProperty = async (req, res) => {
  const { title, location, price, type } = req.body;

  try {
    const newProperty = await Property.create({ title, location, price, type });
    res.status(201).json({ message: 'Property added successfully', property: newProperty });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const searchProperties = async (req, res) => {
  const searchTerm = req.query.searchTerm;

  try {
    const matchingProperties = await Property.find({ title: { $regex: searchTerm, $options: 'i' } });
    res.status(200).json(matchingProperties);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const filterProperties = async (req, res) => {
  const { location, minPrice, maxPrice, type } = req.query;

  const filterCriteria = {};

  if (location) filterCriteria.location = location;
  if (minPrice) filterCriteria.price = { $gte: minPrice };
  if (maxPrice) filterCriteria.price = { ...filterCriteria.price, $lte: maxPrice };
  if (type) filterCriteria.type = type;

  try {
    const filteredProperties = await Property.find(filterCriteria);
    res.status(200).json(filteredProperties);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  getAllProperties,
  createProperty,
  searchProperties,
  filterProperties,
  seedData,
};
