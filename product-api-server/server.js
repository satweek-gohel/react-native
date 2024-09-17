const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// MongoDB connection string with encoded password
const uri = "mongodb+srv://satweek:Satweek%400404@substance.jqtve.mongodb.net/productdb?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectDB();

// Define Product collection
const productCollection = client.db("productdb").collection("products");

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await productCollection.find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
});

// Route to add a new product
app.post('/products', async (req, res) => {
  try {
    const newProduct = req.body;
    const result = await productCollection.insertOne(newProduct);
    res.status(201).json({ message: 'Product added successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Route to update a product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    // Convert id to ObjectId
    const objectId = new ObjectId(id);

    const result = await productCollection.updateOne(
      { _id: objectId },
      { $set: updatedProduct }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', result });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// Route to delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Convert id to ObjectId
    const objectId = new ObjectId(id);

    const result = await productCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// Serve Swagger UI
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API docs available at http://localhost:${port}/api-docs`);
});

// Ensure that the client will close when you finish/error
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});
