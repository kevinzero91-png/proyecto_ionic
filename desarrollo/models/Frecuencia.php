<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "frecuencia".
 *
 * @property int $id_frecuencia
 * @property string $tipo
 *
 * @property Tarea[] $tareas
 */
class Frecuencia extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'frecuencia';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['tipo'], 'required'],
            [['tipo'], 'string', 'max' => 25],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_frecuencia' => 'Id Frecuencia',
            'tipo' => 'Tipo',
        ];
    }

    /**
     * Gets query for [[Tareas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTareas()
    {
        return $this->hasMany(Tarea::class, ['id_frecuencia' => 'id_frecuencia']);
    }

}
