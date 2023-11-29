const Favorite = require('./Favorite');
const Category = require('./Category');
const Image = require('./Image');
const News = require('./News');
const User = require('./User');


Category.hasMany(News);
News.belongsTo(Category);


News.hasMany(Image);
Image.belongsTo(News);


News.hasMany(Favorite);
Favorite.belongsTo(News);


User.hasMany(Favorite);
Favorite.belongsTo(User);



