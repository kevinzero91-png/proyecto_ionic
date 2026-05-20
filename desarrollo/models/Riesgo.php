<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "riesgo".
 *
 * @property int $id_riesgo
 * @property int $id_proyecto
 * @property string $descripcion
 * @property string $impacto
 * @property string $probabilidad
 * @property string|null $estado
 *
 * @property Proyecto $proyecto
 */
class Riesgo extends \yii\db\ActiveRecord
{

    /**
     * ENUM field values
     */
    const IMPACTO_BAJO = 'Bajo';
    const IMPACTO_MEDIO = 'Medio';
    const IMPACTO_ALTO = 'Alto';
    const IMPACTO_CRITICO = 'Crítico';
    const PROBABILIDAD_BAJA = 'Baja';
    const PROBABILIDAD_MEDIA = 'Media';
    const PROBABILIDAD_ALTA = 'Alta';
    const ESTADO_ABIERTO = 'Abierto';
    const ESTADO_MITIGADO = 'Mitigado';
    const ESTADO_CERRADO = 'Cerrado';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'riesgo';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['estado'], 'default', 'value' => 'Abierto'],
            [['id_proyecto', 'descripcion', 'impacto', 'probabilidad'], 'required'],
            [['id_proyecto'], 'integer'],
            [['impacto', 'probabilidad', 'estado'], 'string'],
            [['descripcion'], 'string', 'max' => 255],
            ['impacto', 'in', 'range' => array_keys(self::optsImpacto())],
            ['probabilidad', 'in', 'range' => array_keys(self::optsProbabilidad())],
            ['estado', 'in', 'range' => array_keys(self::optsEstado())],
            [['id_proyecto'], 'exist', 'skipOnError' => true, 'targetClass' => Proyecto::class, 'targetAttribute' => ['id_proyecto' => 'id_proyecto']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_riesgo' => 'Id Riesgo',
            'id_proyecto' => 'Id Proyecto',
            'descripcion' => 'Descripcion',
            'impacto' => 'Impacto',
            'probabilidad' => 'Probabilidad',
            'estado' => 'Estado',
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
     * column impacto ENUM value labels
     * @return string[]
     */
    public static function optsImpacto()
    {
        return [
            self::IMPACTO_BAJO => 'Bajo',
            self::IMPACTO_MEDIO => 'Medio',
            self::IMPACTO_ALTO => 'Alto',
            self::IMPACTO_CRITICO => 'Crítico',
        ];
    }

    /**
     * column probabilidad ENUM value labels
     * @return string[]
     */
    public static function optsProbabilidad()
    {
        return [
            self::PROBABILIDAD_BAJA => 'Baja',
            self::PROBABILIDAD_MEDIA => 'Media',
            self::PROBABILIDAD_ALTA => 'Alta',
        ];
    }

    /**
     * column estado ENUM value labels
     * @return string[]
     */
    public static function optsEstado()
    {
        return [
            self::ESTADO_ABIERTO => 'Abierto',
            self::ESTADO_MITIGADO => 'Mitigado',
            self::ESTADO_CERRADO => 'Cerrado',
        ];
    }

    /**
     * @return string
     */
    public function displayImpacto()
    {
        return self::optsImpacto()[$this->impacto];
    }

    /**
     * @return bool
     */
    public function isImpactoBajo()
    {
        return $this->impacto === self::IMPACTO_BAJO;
    }

    public function setImpactoToBajo()
    {
        $this->impacto = self::IMPACTO_BAJO;
    }

    /**
     * @return bool
     */
    public function isImpactoMedio()
    {
        return $this->impacto === self::IMPACTO_MEDIO;
    }

    public function setImpactoToMedio()
    {
        $this->impacto = self::IMPACTO_MEDIO;
    }

    /**
     * @return bool
     */
    public function isImpactoAlto()
    {
        return $this->impacto === self::IMPACTO_ALTO;
    }

    public function setImpactoToAlto()
    {
        $this->impacto = self::IMPACTO_ALTO;
    }

    /**
     * @return bool
     */
    public function isImpactoCritico()
    {
        return $this->impacto === self::IMPACTO_CRITICO;
    }

    public function setImpactoToCritico()
    {
        $this->impacto = self::IMPACTO_CRITICO;
    }

    /**
     * @return string
     */
    public function displayProbabilidad()
    {
        return self::optsProbabilidad()[$this->probabilidad];
    }

    /**
     * @return bool
     */
    public function isProbabilidadBaja()
    {
        return $this->probabilidad === self::PROBABILIDAD_BAJA;
    }

    public function setProbabilidadToBaja()
    {
        $this->probabilidad = self::PROBABILIDAD_BAJA;
    }

    /**
     * @return bool
     */
    public function isProbabilidadMedia()
    {
        return $this->probabilidad === self::PROBABILIDAD_MEDIA;
    }

    public function setProbabilidadToMedia()
    {
        $this->probabilidad = self::PROBABILIDAD_MEDIA;
    }

    /**
     * @return bool
     */
    public function isProbabilidadAlta()
    {
        return $this->probabilidad === self::PROBABILIDAD_ALTA;
    }

    public function setProbabilidadToAlta()
    {
        $this->probabilidad = self::PROBABILIDAD_ALTA;
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
    public function isEstadoAbierto()
    {
        return $this->estado === self::ESTADO_ABIERTO;
    }

    public function setEstadoToAbierto()
    {
        $this->estado = self::ESTADO_ABIERTO;
    }

    /**
     * @return bool
     */
    public function isEstadoMitigado()
    {
        return $this->estado === self::ESTADO_MITIGADO;
    }

    public function setEstadoToMitigado()
    {
        $this->estado = self::ESTADO_MITIGADO;
    }

    /**
     * @return bool
     */
    public function isEstadoCerrado()
    {
        return $this->estado === self::ESTADO_CERRADO;
    }

    public function setEstadoToCerrado()
    {
        $this->estado = self::ESTADO_CERRADO;
    }
}
