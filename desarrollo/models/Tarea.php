<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tarea".
 *
 * @property int $id_tarea
 * @property int|null $id_categoria
 * @property int|null $id_usuario
 * @property int|null $id_proyecto
 * @property string|null $titulo
 * @property string|null $descripcion
 * @property int|null $id_estado
 * @property int|null $id_prioridad
 * @property int|null $id_frecuencia
 * @property int|null $id_etiqueta
 * @property string|null $vencimiento
 * @property string|null $creacion
 * @property string|null $actualizacion
 *
 * @property Archivo[] $archivos
 * @property Categoria $categoria
 * @property Comentario[] $comentarios
 * @property Estado $estado
 * @property Etiqueta $etiqueta
 * @property Frecuencia $frecuencia
 * @property Nota[] $notas
 * @property Notificacion[] $notificacions
 * @property Prioridad $prioridad
 * @property Proyecto $proyecto
 * @property Sesion[] $sesions
 * @property Subtarea[] $subtareas
 * @property Usuario $usuario
 */
class Tarea extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tarea';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_categoria', 'id_usuario', 'id_proyecto', 'titulo', 'descripcion', 'id_estado', 'id_prioridad', 'id_frecuencia', 'id_etiqueta', 'vencimiento', 'actualizacion'], 'default', 'value' => null],
            [['id_categoria', 'id_usuario', 'id_proyecto', 'id_estado', 'id_prioridad', 'id_frecuencia', 'id_etiqueta'], 'integer'],
            [['descripcion'], 'string'],
            [['vencimiento', 'creacion', 'actualizacion'], 'safe'],
            [['titulo'], 'string', 'max' => 50],
            [['id_categoria'], 'exist', 'skipOnError' => true, 'targetClass' => Categoria::class, 'targetAttribute' => ['id_categoria' => 'id_categoria']],
            [['id_estado'], 'exist', 'skipOnError' => true, 'targetClass' => Estado::class, 'targetAttribute' => ['id_estado' => 'id_estado']],
            [['id_etiqueta'], 'exist', 'skipOnError' => true, 'targetClass' => Etiqueta::class, 'targetAttribute' => ['id_etiqueta' => 'id_etiqueta']],
            [['id_frecuencia'], 'exist', 'skipOnError' => true, 'targetClass' => Frecuencia::class, 'targetAttribute' => ['id_frecuencia' => 'id_frecuencia']],
            [['id_prioridad'], 'exist', 'skipOnError' => true, 'targetClass' => Prioridad::class, 'targetAttribute' => ['id_prioridad' => 'id_prioridad']],
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
            'id_tarea' => 'Id Tarea',
            'id_categoria' => 'Id Categoria',
            'id_usuario' => 'Id Usuario',
            'id_proyecto' => 'Id Proyecto',
            'titulo' => 'Titulo',
            'descripcion' => 'Descripcion',
            'id_estado' => 'Id Estado',
            'id_prioridad' => 'Id Prioridad',
            'id_frecuencia' => 'Id Frecuencia',
            'id_etiqueta' => 'Id Etiqueta',
            'vencimiento' => 'Vencimiento',
            'creacion' => 'Creacion',
            'actualizacion' => 'Actualizacion',
        ];
    }

    /**
     * Gets query for [[Archivos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getArchivos()
    {
        return $this->hasMany(Archivo::class, ['id_tarea' => 'id_tarea']);
    }

    /**
     * Gets query for [[Categoria]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCategoria()
    {
        return $this->hasOne(Categoria::class, ['id_categoria' => 'id_categoria']);
    }

    /**
     * Gets query for [[Comentarios]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getComentarios()
    {
        return $this->hasMany(Comentario::class, ['id_tarea' => 'id_tarea']);
    }

    /**
     * Gets query for [[Estado]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEstado()
    {
        return $this->hasOne(Estado::class, ['id_estado' => 'id_estado']);
    }

    /**
     * Gets query for [[Etiqueta]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEtiqueta()
    {
        return $this->hasOne(Etiqueta::class, ['id_etiqueta' => 'id_etiqueta']);
    }

    /**
     * Gets query for [[Frecuencia]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFrecuencia()
    {
        return $this->hasOne(Frecuencia::class, ['id_frecuencia' => 'id_frecuencia']);
    }

    /**
     * Gets query for [[Notas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getNotas()
    {
        return $this->hasMany(Nota::class, ['id_tarea' => 'id_tarea']);
    }

    /**
     * Gets query for [[Notificacions]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getNotificacions()
    {
        return $this->hasMany(Notificacion::class, ['id_tarea' => 'id_tarea']);
    }

    /**
     * Gets query for [[Prioridad]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getPrioridad()
    {
        return $this->hasOne(Prioridad::class, ['id_prioridad' => 'id_prioridad']);
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
     * Gets query for [[Sesions]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSesions()
    {
        return $this->hasMany(Sesion::class, ['id_tarea' => 'id_tarea']);
    }

    /**
     * Gets query for [[Subtareas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSubtareas()
    {
        return $this->hasMany(Subtarea::class, ['id_tarea' => 'id_tarea']);
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
