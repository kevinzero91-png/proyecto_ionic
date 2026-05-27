<?php
namespace app\models;

use yii\db\ActiveRecord;

class Prioridad extends ActiveRecord
{
    public static function tableName()
    {
        return 'prioridad'; // El nombre exacto de tu tabla en phpMyAdmin
    }
}