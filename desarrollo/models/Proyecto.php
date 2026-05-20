<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "proyecto".
 *
 * @property int $id_proyecto
 * @property int $id_usuario
 * @property string $nombre
 * @property string|null $descripcion
 * @property string|null $inicio
 * @property string|null $fin
 * @property string|null $estado
 *
 * @property Equipo[] $equipos
 * @property Fase[] $fases
 * @property Presupuesto[] $presupuestos
 * @property Riesgo[] $riesgos
 * @property Tarea[] $tareas
 * @property Usuario $usuario
 */
class Proyecto extends \yii\db\ActiveRecord
{

    /**
     * ENUM field values
     */
    const ESTADO_PLANIFICADO = 'Planificado';
    const ESTADO_EN_CURSO = 'En Curso';
    const ESTADO_PAUSADO = 'Pausado';
    const ESTADO_TERMINADO = 'Terminado';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'proyecto';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['descripcion', 'inicio', 'fin'], 'default', 'value' => null],
            [['estado'], 'default', 'value' => 'Planificado'],
            [['id_usuario', 'nombre'], 'required'],
            [['id_usuario'], 'integer'],
            [['descripcion', 'estado'], 'string'],
            [['inicio', 'fin'], 'safe'],
            [['nombre'], 'string', 'max' => 100],
            ['estado', 'in', 'range' => array_keys(self::optsEstado())],
            [['id_usuario'], 'exist', 'skipOnError' => true, 'targetClass' => Usuario::class, 'targetAttribute' => ['id_usuario' => 'id_usuario']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_proyecto' => 'Id Proyecto',
            'id_usuario' => 'Id Usuario',
            'nombre' => 'Nombre',
            'descripcion' => 'Descripcion',
            'inicio' => 'Inicio',
            'fin' => 'Fin',
            'estado' => 'Estado',
        ];
    }

    /**
     * Gets query for [[Equipos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEquipos()
    {
        return $this->hasMany(Equipo::class, ['id_proyecto' => 'id_proyecto']);
    }

    /**
     * Gets query for [[Fases]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFases()
    {
        return $this->hasMany(Fase::class, ['id_proyecto' => 'id_proyecto']);
    }

    /**
     * Gets query for [[Presupuestos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getPresupuestos()
    {
        return $this->hasMany(Presupuesto::class, ['id_proyecto' => 'id_proyecto']);
    }

    /**
     * Gets query for [[Riesgos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getRiesgos()
    {
        return $this->hasMany(Riesgo::class, ['id_proyecto' => 'id_proyecto']);
    }

    /**
     * Gets query for [[Tareas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTareas()
    {
        return $this->hasMany(Tarea::class, ['id_proyecto' => 'id_proyecto']);
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
     * column estado ENUM value labels
     * @return string[]
     */
    public static function optsEstado()
    {
        return [
            self::ESTADO_PLANIFICADO => 'Planificado',
            self::ESTADO_EN_CURSO => 'En Curso',
            self::ESTADO_PAUSADO => 'Pausado',
            self::ESTADO_TERMINADO => 'Terminado',
        ];
    }

    /**
     * @return string
     */
    public function displayEstado()
    {
        return self::optsEstado()[$this->estado];
    }

    /**
     * @return bool
     */
    public function isEstadoPlanificado()
    {
        return $this->estado === self::ESTADO_PLANIFICADO;
    }

    public function setEstadoToPlanificado()
    {
        $this->estado = self::ESTADO_PLANIFICADO;
    }

    /**
     * @return bool
     */
    public function isEstadoEnCurso()
    {
        return $this->estado === self::ESTADO_EN_CURSO;
    }

    public function setEstadoToEnCurso()
    {
        $this->estado = self::ESTADO_EN_CURSO;
    }

    /**
     * @return bool
     */
    public function isEstadoPausado()
    {
        return $this->estado === self::ESTADO_PAUSADO;
    }

    public function setEstadoToPausado()
    {
        $this->estado = self::ESTADO_PAUSADO;
    }

    /**
     * @return bool
     */
    public function isEstadoTerminado()
    {
        return $this->estado === self::ESTADO_TERMINADO;
    }

    public function setEstadoToTerminado()
    {
        $this->estado = self::ESTADO_TERMINADO;
    }
}
