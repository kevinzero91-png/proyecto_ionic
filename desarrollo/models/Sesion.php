<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "sesion".
 *
 * @property int $id_sesion
 * @property int $id_tarea
 * @property string $inicio
 * @property string|null $fin
 * @property int|null $duracion Tiempo en segundos
 *
 * @property Tarea $tarea
 */
class Sesion extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'sesion';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fin'], 'default', 'value' => null],
            [['duracion'], 'default', 'value' => 0],
            [['id_tarea'], 'required'],
            [['id_tarea', 'duracion'], 'integer'],
            [['inicio', 'fin'], 'safe'],
            [['id_tarea'], 'exist', 'skipOnError' => true, 'targetClass' => Tarea::class, 'targetAttribute' => ['id_tarea' => 'id_tarea']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_sesion' => 'Id Sesion',
            'id_tarea' => 'Id Tarea',
            'inicio' => 'Inicio',
            'fin' => 'Fin',
            'duracion' => 'Duracion',
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
