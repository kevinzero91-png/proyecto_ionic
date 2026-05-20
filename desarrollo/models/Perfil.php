<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "perfil".
 *
 * @property int $id_perfil
 * @property int $id_usuario
 * @property string|null $registro
 * @property int|null $id_pais
 *
 * @property Pais $pais
 * @property Usuario $usuario
 */
class Perfil extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'perfil';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_pais'], 'default', 'value' => null],
            [['id_usuario'], 'required'],
            [['id_usuario', 'id_pais'], 'integer'],
            [['registro'], 'safe'],
            [['id_usuario'], 'exist', 'skipOnError' => true, 'targetClass' => Usuario::class, 'targetAttribute' => ['id_usuario' => 'id_usuario']],
            [['id_pais'], 'exist', 'skipOnError' => true, 'targetClass' => Pais::class, 'targetAttribute' => ['id_pais' => 'id_pais']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_perfil' => 'Id Perfil',
            'id_usuario' => 'Id Usuario',
            'registro' => 'Registro',
            'id_pais' => 'Id Pais',
        ];
    }

    /**
     * Gets query for [[Pais]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getPais()
    {
        return $this->hasOne(Pais::class, ['id_pais' => 'id_pais']);
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
