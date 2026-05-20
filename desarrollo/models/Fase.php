<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "fase".
 *
 * @property int $id_fase
 * @property int $id_proyecto
 * @property string $nombre
 * @property int|null $orden
 * @property string|null $fecha_limite
 *
 * @property Proyecto $proyecto
 */
class Fase extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'fase';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fecha_limite'], 'default', 'value' => null],
            [['orden'], 'default', 'value' => 0],
            [['id_proyecto', 'nombre'], 'required'],
            [['id_proyecto', 'orden'], 'integer'],
            [['fecha_limite'], 'safe'],
            [['nombre'], 'string', 'max' => 50],
            [['id_proyecto'], 'exist', 'skipOnError' => true, 'targetClass' => Proyecto::class, 'targetAttribute' => ['id_proyecto' => 'id_proyecto']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_fase' => 'Id Fase',
            'id_proyecto' => 'Id Proyecto',
            'nombre' => 'Nombre',
            'orden' => 'Orden',
            'fecha_limite' => 'Fecha Limite',
        ];
    }

    /**
     * Gets query for [[Proyecto]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProyecto()
    {
        return $this->hasOne(Proyecto::class, ['id_proyecto' => 'id_proyecto']);
    }

}
