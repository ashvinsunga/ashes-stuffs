import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // if error "Error: URI must include hostname, domain name, and tld" appeared,
    // maybe you are using special characters on your password, use the percent encoding instead.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
