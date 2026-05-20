<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "registro".
 *
 * @property int $id_registro
 * @property int|null $id_usuario
 * @property string|null $fecha
 *
 * @property Usuario $usuario
 */
class Registro extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'registro';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_usuario', 'fecha'], 'default', 'value' => null],
            [['id_usuario'], 'integer'],
            [['fecha'], 'safe'],
            [['id_usuario'], 'exist', 'skipOnError' => true, 'targetClass' => Usuario::class, 'targetAttribute' => ['id_usuario' => 'id_usuario']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_registro' => 'Id Registro',
            'id_usuario' => 'Id Usuario',
            'fecha' => 'Fecha',
        ];
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
