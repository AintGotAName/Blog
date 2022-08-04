const connectDatabase = async (mongoose, connection) => {
    console.log(`--- connectDatabase ---\nConnecting database!\n`);
    try {
        await mongoose.connect(connection);
        console.log(
            `--- connectDatabase ---\nDatabase connected: ${connection}\n`
        );
    } catch (err) {
        console.log(`--- connectDatabase ---\nError!\n`);
    }
};

export { connectDatabase };
