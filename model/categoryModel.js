const mongoose = require('mongoose');
const slugify = require('slugify');

// schema 
const categorySchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: [true, 'category name is required'],
        minLength: [3, 'The length should be more than 3 character'],
        maxLength: [32, 'The length should be less than  32 character']
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String

},
    {
        timestamps: true,
    }
);



// Middleware to generate slug before saving the document
categorySchema.pre('save', function (next) {
    // Check if the name has been modified or if it's a new document

    if (this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, { lower: true });
    }
    next();
});

const Category = mongoose.model('category', categorySchema);


module.exports = Category;