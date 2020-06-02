module.exports = mongoose => {
  const Contact = mongoose.model(
    'contact',
    mongoose.Schema(
      {
        name: String,
        email: String,
        address: String,
        phones: [String]
      },
      { timestamps: true }
    )
  );

  return Contact;
};