import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../database'

export class DailyVerse extends Model<InferAttributes<DailyVerse>, InferCreationAttributes<DailyVerse>> {
  declare id: CreationOptional<number>
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>
  declare date: Date
  declare date_label: string
  declare name_day: string
  declare song_index: string
  declare song_name: string

  declare new_verse_title: string
  declare new_verse_location: string
  declare new_verse: string
  declare new_explanation_title: string
  declare new_explanation: string

  declare old_verse_title: string
  declare old_verse_location: string
  declare old_verse: string
  declare old_explanation_title: string
  declare old_explanation_subtitle: string
  declare old_explanation: string
}

DailyVerse.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  date: DataTypes.DATE,

  date_label: DataTypes.STRING,
  name_day: DataTypes.STRING,
  song_index: DataTypes.STRING,
  song_name: DataTypes.STRING,

  new_verse_title: DataTypes.TEXT,
  new_verse_location: DataTypes.TEXT,
  new_verse: DataTypes.TEXT,
  new_explanation_title: DataTypes.TEXT,
  new_explanation: DataTypes.TEXT,

  old_verse_title: DataTypes.TEXT,
  old_verse_location: DataTypes.TEXT,
  old_verse: DataTypes.TEXT,
  old_explanation_title: DataTypes.TEXT,
  old_explanation_subtitle: DataTypes.TEXT,
  old_explanation: DataTypes.TEXT

}, {sequelize})