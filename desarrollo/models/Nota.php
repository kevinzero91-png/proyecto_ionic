<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "nota".
 *
 * @property int $id_nota
 * @property int|null $id_tarea
 * @property string|null $contenido
 *
 * @property Tarea $tarea
 */
class Nota extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'nota';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_tarea', 'contenido'], 'default', 'value' => null],
            [['id_tarea'], 'integer'],
            [['contenido'], 'string'],
            [['id_tarea'], 'exist', 'skipOnError' => true, 'targetClass' => Tarea::class, 'targetAttribute' => ['id_tarea' => 'id_tarea']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_nota' => 'Id Nota',
            'id_tarea' => 'Id Tarea',
            'contenido' => 'Contenido',
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
