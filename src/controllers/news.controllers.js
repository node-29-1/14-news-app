const catchError = require('../utils/catchError');
const News = require('../models/News');
const Category = require('../models/Category');
const Image = require('../models/Image');
const { Op } = require('sequelize');

const getAll = catchError(async(req, res) => {
    const { category, headline__icontains } = req.query;
    const where = {};
    if (headline__icontains) where.headline = { [Op.iLike]: `%${headline__icontains}%`}
    if (category) where.categoryId = category;
    
    const results = await News.findAll({ 
        include: [Category, Image],
        where: where,
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await News.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await News.findByPk(id, { include: [Category, Image]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await News.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await News.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}