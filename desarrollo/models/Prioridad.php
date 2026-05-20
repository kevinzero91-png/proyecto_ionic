<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "prioridad".
 *
 * @property int $id_prioridad
 * @property string $nivel
 *
 * @property Tarea[] $tareas
 */
class Prioridad extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'prioridad';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nivel'], 'required'],
            [['nivel'], 'string', 'max' => 25],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_prioridad' => 'Id Prioridad',
            'nivel' => 'Nivel',
        ];
    }

    /**
     * Gets query for [[Tareas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTareas()
    {
        return $this->hasMany(Tarea::class, ['id_prioridad' => 'id_prioridad']);
    }

}
