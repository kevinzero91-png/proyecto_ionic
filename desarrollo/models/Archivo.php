<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "archivo".
 *
 * @property int $id_archivo
 * @property int $id_tarea
 * @property string $nombre
 * @property string $url
 * @property string|null $tipo
 *
 * @property Tarea $tarea
 */
class Archivo extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'archivo';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['tipo'], 'default', 'value' => null],
            [['id_tarea', 'nombre', 'url'], 'required'],
            [['id_tarea'], 'integer'],
            [['nombre'], 'string', 'max' => 255],
            [['url'], 'string', 'max' => 512],
            [['tipo'], 'string', 'max' => 50],
            [['id_tarea'], 'exist', 'skipOnError' => true, 'targetClass' => Tarea::class, 'targetAttribute' => ['id_tarea' => 'id_tarea']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_archivo' => 'Id Archivo',
            'id_tarea' => 'Id Tarea',
            'nombre' => 'Nombre',
            'url' => 'Url',
            'tipo' => 'Tipo',
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
