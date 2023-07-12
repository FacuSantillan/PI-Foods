const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    summary: {
    	type: DataTypes.TEXT,
				allowNull: false,
    },

    healthScore: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },

    steps: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    }
  });
};
