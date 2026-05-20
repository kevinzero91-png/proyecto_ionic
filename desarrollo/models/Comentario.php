<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "comentario".
 *
 * @property int $id_comentario
 * @property int $id_tarea
 * @property int $id_usuario
 * @property string $texto
 * @property string|null $fecha
 *
 * @property Tarea $tarea
 * @property Usuario $usuario
 */
class Comentario extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'comentario';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_tarea', 'id_usuario', 'texto'], 'required'],
            [['id_tarea', 'id_usuario'], 'integer'],
            [['texto'], 'string'],
            [['fecha'], 'safe'],
            [['id_tarea'], 'exist', 'skipOnError' => true, 'targetClass' => Tarea::class, 'targetAttribute' => ['id_tarea' => 'id_tarea']],
            [['id_usuario'], 'exist', 'skipOnError' => true, 'targetClass' => Usuario::class, 'targetAttribute' => ['id_usuario' => 'id_usuario']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_comentario' => 'Id Comentario',
            'id_tarea' => 'Id Tarea',
            'id_usuario' => 'Id Usuario',
            'texto' => 'Texto',
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

    /**
     * Gets query for [[Usuario]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUsuario()
    {
        return $this->hasOne(Usuario::class, ['id_usuario' => 'id_usuario']);
    }

}
