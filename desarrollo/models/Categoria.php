<?php
namespace app\models;

use yii\db\ActiveRecord;

class Categoria extends ActiveRecord
{
    public static function tableName()
    {
        return 'categoria';
    }

    // AÑADE ESTO: Esto le dice a Yii2 que el campo 'nombre' es seguro y obligatorio
    public function rules()
    {
        return [
            [['nombre'], 'required'],
            [['nombre'], 'string', 'max' => 255],
        ];
    }
}
