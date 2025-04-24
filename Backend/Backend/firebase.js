const admin = require('firebase-admin');
const mongoose = require('mongoose');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('/Users/princepatel/Downloads/inventory-management-master/Backend/sih-finale-ar-firebase-adminsdk-srje8-f7a1c15b80.json')),
  databaseURL: "https://sih-finale-ar-default-rtdb.firebaseio.com/" // Replace with your Firebase Realtime Database URL
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SHI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Load Product model
const Product = require('./models/Product'); // Replace with the correct path to your Product model

// Helper function to recursively extract valid records
const extractRecords = (data) => {
  const records = [];

  const traverse = (node) => {
    if (Array.isArray(node)) {
      // If the node is an array, traverse each element
      node.forEach((item) => traverse(item));
    } else if (typeof node === 'object' && node !== null) {
      // If the node is an object, check if it contains 'name' and 'qty'
      if ('name' in node && 'qty' in node) {
        records.push({ name: node.name, quantity: node.qty });
      } else {
        // Otherwise, traverse its children
        Object.values(node).forEach((child) => traverse(child));
      }
    }
  };

  traverse(data);
  return records;
};

// Fetch data from Firebase and update MongoDB
const fetchAndUpdateMongoDB = async () => {
  try {
    const ref = admin.database().ref('/'); // Reference to Firebase root
    const snapshot = await ref.once('value');
    const data = snapshot.val();

    // Check if data exists
    if (!data) {
      console.log('No data found in Firebase');
      return;
    }

    // Extract all valid records
    const records = extractRecords(data);

    if (records.length === 0) {
      console.log('No valid records found in Firebase');
      return;
    }

    console.log("Fetched and extracted data from Firebase:", records);

    // Update MongoDB records based on the extracted data
    for (const record of records) {
      console.log(`Processing record for product: ${record.name}`);

      // Find the product by name
      const existingProduct = await Product.findOne({ name: record.name });

      if (existingProduct) {
        // If product exists, update the quantity
        existingProduct.quantity = existingProduct.quantity + record.quantity - record.quantity + 1;
        await existingProduct.save();
        console.log(`Updated quantity for product: ${record.name} to ${existingProduct.quantity}`);
      } else {
        // If product doesn't exist, create a new record
        const newProduct = new Product({
          category: 'General', // Default category; update as needed
          name: record.name,
          price: 0, // Default price; update as needed
          quantity: record.quantity,
        });
        await newProduct.save();
        console.log(`Created new product: ${record.name} with quantity: ${record.quantity}`);
      }
    }

    console.log('Data successfully updated in MongoDB');
  } catch (error) {
    console.error('Error fetching data or updating MongoDB:', error);
  } finally {
    mongoose.connection.close(); // Close the MongoDB connection
  }
};

// Run the script
fetchAndUpdateMongoDB();