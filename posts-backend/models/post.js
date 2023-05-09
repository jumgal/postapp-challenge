const getPostModel = (sequelize, { DataTypes }) => {
    const Post = sequelize.define('post', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  
    Post.associate = (models) => {
      Post.belongsTo(models.User);
    };
  
    return Post;
  };
  
  export default getPostModel;