const Category = require('../model/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');



// action ==> get all CATEGORY
// routes ==> GET /api/v1/categories
// access ==> PUBLIC

exports.getAllCategories = catchAsync(async (req, res, next) => {

    // GET ALL RESULTS
    let query = Category.find();


    // PAGINATION
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // FINAL RESULT
    const categories = await query;


    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: {
            categories
        }
    });
});


// action ==> CREATE a new  CATEGORY
// routes ==> POST /api/v1/categories
// access ==> PRIVATE

exports.createCategory = catchAsync(async (req, res, next) => {

    const { name } = req.body;
    const category = await Category.create({ name });

    res.status(201).json({
        status: 'success',
        data: {
            category
        }
    });

});


// action ==> get specific category
// routes ==> GET /api/v1/categories/:categoryId
// access ==> pubic

exports.getCategory = catchAsync(async (req, res, next) => {

    const category = await Category.findById(req.params.categoryId);
    if (!category) return next(new AppError('This id does not has a match category', 404));

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    });
});


// action ==> update specific category
// routes ==> PATCH /api/v1/categories/:categoryId
// access ==> private

exports.updateCategory = catchAsync(async (req, res, next) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    // Find the category by ID
    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
        return next(new AppError('This category does not exist', 404));
    }

    // Update the category name
    existingCategory.name = name;

    // Save the updated category (this will trigger the pre('save') middleware)
    const updatedCategory = await existingCategory.save();

    res.status(200).json({
        status: 'success',
        data: {
            updatedCategory
        }
    });
});


// action ==> delete all category
// routes ==> DELETE /api/v1/categories
// access ==> private

exports.deleteAllCategories = catchAsync(async (req, res, next) => {
    const result = await Category.deleteMany({});

    if (result.deletedCount === 0) {
        return next(new AppError('No category found to delete create new category using POST /api/v1/categories', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            message: 'All data deleted successfully',
            deletedCount: result.deletedCount,
        }
    });
});


// action ==> delete specific category
// routes ==> DELETE /api/v1/categories/:categoryId
// access ==> private

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const { categoryId } = req.params;
    const result = await Category.findByIdAndDelete(categoryId);

    if (!result) {
        return next(new AppError(`The id ${categoryId} is not correct `, 404));
    }


    res.status(204).json({
        status: 'success',
        data: null
    });
});



