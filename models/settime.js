'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SetTime extends Model {
    static associate( { Band, Event, Stage } ) {
      // event
      SetTime.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event"
      })

      //stage
      SetTime.belongsTo(Stage, {
        foreignKey: "stage_id",
        as: "stage"
      })

      //band
      SetTime.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      })
    }
  }
  SetTime.init({
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    set_time_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }    
  }, {
    sequelize,
    modelName: 'SetTime',
    timestamps: false
  });
  return SetTime;
};