<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "subtarea".
 *
 * @property int $id_subtarea
 * @property int $id_tarea
 * @property string $descripcion
 * @property int|null $completado
 * @property int|null $orden
 *
 * @property Tarea $tarea
 */
class Subtarea extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'subtarea';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['orden'], 'default', 'value' => 0],
            [['id_tarea', 'descripcion'], 'required'],
            [['id_tarea', 'completado', 'orden'], 'integer'],
            [['descripcion'], 'string', 'max' => 255],
            [['id_tarea'], 'exist', 'skipOnError' => true, 'targetClass' => Tarea::class, 'targetAttribute' => ['id_tarea' => 'id_tarea']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_subtarea' => 'Id Subtarea',
            'id_tarea' => 'Id Tarea',
            'descripcion' => 'Descripcion',
            'completado' => 'Completado',
            'orden' => 'Orden',
        ];
    }

    /**
     * Gets query for [[Tarea]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTarea()
    {
        return $this->hasOne(Tarea::class, ['id_tarea' => 'id_tarea']);
    }

}
