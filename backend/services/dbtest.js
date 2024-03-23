import { MongoClient, ServerApiVersion } from "mongodb";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
// Insert data into a collection
const collectionName = "DiceHack"; // Replace with your desired collection name
const db = client.db("hacker"); // Replace "myDatabase" with your database name

// Example data to insert
const dummyProduct = {
  product_title: "Smartphone",
  description: "A high-performance smartphone with advanced features.",
  category: "Electronics",
  mrp: 599.99,
  retail_price: 499.99,
  selling_price: 479.99,
  status: "Active",
  dimensions: {
    length: 0.15,
    breadth: 0.08,
    height: 0.01,
  },
  image_urls: {
    remove_bg: "https://example.com/smartphone_remove_bg.jpg",
    showcase: "https://example.com/smartphone_showcase.jpg",
  },
};

const result = await db.collection(collectionName).insertOne(dummyProduct);
console.log("Data inserted successfully:", result.insertedId);

async function fetchAllData() {
  const collection = db.collection(collectionName);
  const data = await collection.find().toArray();
  console.log("Fetched data:", data);
}

fetchAllData().catch(console.error);
