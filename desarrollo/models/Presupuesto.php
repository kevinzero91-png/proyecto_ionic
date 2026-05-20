<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "presupuesto".
 *
 * @property int $id_presupuesto
 * @property int $id_proyecto
 * @property string $concepto
 * @property float $monto
 * @property string $tipo
 * @property string $fecha
 *
 * @property Proyecto $proyecto
 */
class Presupuesto extends \yii\db\ActiveRecord
{

    /**
     * ENUM field values
     */
    const TIPO_INGRESO = 'Ingreso';
    const TIPO_GASTO = 'Gasto';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'presupuesto';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_proyecto', 'concepto', 'monto', 'tipo', 'fecha'], 'required'],
            [['id_proyecto'], 'integer'],
            [['monto'], 'number'],
            [['tipo'], 'string'],
            [['fecha'], 'safe'],
            [['concepto'], 'string', 'max' => 100],
            ['tipo', 'in', 'range' => array_keys(self::optsTipo())],
            [['id_proyecto'], 'exist', 'skipOnError' => true, 'targetClass' => Proyecto::class, 'targetAttribute' => ['id_proyecto' => 'id_proyecto']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_presupuesto' => 'Id Presupuesto',
            'id_proyecto' => 'Id Proyecto',
            'concepto' => 'Concepto',
            'monto' => 'Monto',
            'tipo' => 'Tipo',
            'fecha' => 'Fecha',
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
     * column tipo ENUM value labels
     * @return string[]
     */
    public static function optsTipo()
    {
        return [
            self::TIPO_INGRESO => 'Ingreso',
            self::TIPO_GASTO => 'Gasto',
        ];
    }

    /**
     * @return string
     */
    public function displayTipo()
    {
        return self::optsTipo()[$this->tipo];
    }

    /**
     * @return bool
     */
    public function isTipoIngreso()
    {
        return $this->tipo === self::TIPO_INGRESO;
    }

    public function setTipoToIngreso()
    {
        $this->tipo = self::TIPO_INGRESO;
    }

    /**
     * @return bool
     */
    public function isTipoGasto()
    {
        return $this->tipo === self::TIPO_GASTO;
    }

    public function setTipoToGasto()
    {
        $this->tipo = self::TIPO_GASTO;
    }
}
