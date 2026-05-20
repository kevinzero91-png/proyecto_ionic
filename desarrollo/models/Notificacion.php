<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "notificacion".
 *
 * @property int $id_notificacion
 * @property int $id_tarea
 * @property string $fecha
 *
 * @property Tarea $tarea
 */
class Notificacion extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'notificacion';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_tarea', 'fecha'], 'required'],
            [['id_tarea'], 'integer'],
            [['fecha'], 'safe'],
            [['id_tarea'], 'exist', 'skipOnError' => true, 'targetClass' => Tarea::class, 'targetAttribute' => ['id_tarea' => 'id_tarea']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_notificacion' => 'Id Notificacion',
            'id_tarea' => 'Id Tarea',
            'fecha' => 'Fecha',
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
