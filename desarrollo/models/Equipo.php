<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "equipo".
 *
 * @property int $id_equipo
 * @property int $id_proyecto
 * @property int $id_usuario
 * @property string|null $rol
 * @property string|null $fecha_union
 *
 * @property Proyecto $proyecto
 * @property Usuario $usuario
 */
class Equipo extends \yii\db\ActiveRecord
{

    /**
     * ENUM field values
     */
    const ROL_ADMINISTRADOR = 'Administrador';
    const ROL_EDITOR = 'Editor';
    const ROL_OBSERVADOR = 'Observador';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'equipo';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['rol'], 'default', 'value' => 'Editor'],
            [['id_proyecto', 'id_usuario'], 'required'],
            [['id_proyecto', 'id_usuario'], 'integer'],
            [['rol'], 'string'],
            [['fecha_union'], 'safe'],
            ['rol', 'in', 'range' => array_keys(self::optsRol())],
            [['id_proyecto'], 'exist', 'skipOnError' => true, 'targetClass' => Proyecto::class, 'targetAttribute' => ['id_proyecto' => 'id_proyecto']],
            [['id_usuario'], 'exist', 'skipOnError' => true, 'targetClass' => Usuario::class, 'targetAttribute' => ['id_usuario' => 'id_usuario']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_equipo' => 'Id Equipo',
            'id_proyecto' => 'Id Proyecto',
            'id_usuario' => 'Id Usuario',
            'rol' => 'Rol',
            'fecha_union' => 'Fecha Union',
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

    /**
     * Gets query for [[Usuario]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUsuario()
    {
        return $this->hasOne(Usuario::class, ['id_usuario' => 'id_usuario']);
    }


    /**
     * column rol ENUM value labels
     * @return string[]
     */
    public static function optsRol()
    {
        return [
            self::ROL_ADMINISTRADOR => 'Administrador',
            self::ROL_EDITOR => 'Editor',
            self::ROL_OBSERVADOR => 'Observador',
        ];
    }

    /**
     * @return string
     */
    public function displayRol()
    {
        return self::optsRol()[$this->rol];
    }

    /**
     * @return bool
     */
    public function isRolAdministrador()
    {
        return $this->rol === self::ROL_ADMINISTRADOR;
    }

    public function setRolToAdministrador()
    {
        $this->rol = self::ROL_ADMINISTRADOR;
    }

    /**
     * @return bool
     */
    public function isRolEditor()
    {
        return $this->rol === self::ROL_EDITOR;
    }

    public function setRolToEditor()
    {
        $this->rol = self::ROL_EDITOR;
    }

    /**
     * @return bool
     */
    public function isRolObservador()
    {
        return $this->rol === self::ROL_OBSERVADOR;
    }

    public function setRolToObservador()
    {
        $this->rol = self::ROL_OBSERVADOR;
    }
}
