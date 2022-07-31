const connectDatabase = async (mongoose, connection) => {
    try {
        await mongoose.connect(connection);
        console.log(`Database connected successfully at ${connection}\n`);
    } catch (err) {
        console.log(`Error detected while connecting to database!\n`);
    }
};

export { connectDatabase };
