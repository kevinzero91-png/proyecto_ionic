<?php

namespace app\models;

use Yii;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "usuario".
 *
 * @property int $id_usuario
 * @property string $nombre
 * @property string $email
 * @property string $password_hash
 * @property string|null $access_token
 * @property string|null $foto_perfil
 * @property string|null $password_reset_token
 *
 * @property Comentario[] $comentarios
 * @property Equipo[] $equipos
 * @property Perfil[] $perfils
 * @property Proyecto[] $proyectos
 * @property Registro[] $registros
 * @property Tarea[] $tareas
 */
class Usuario extends \yii\db\ActiveRecord implements IdentityInterface 
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'usuario';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            // El correo ahora es obligatorio junto con el nombre y contraseña
            [['nombre', 'email', 'password_hash'], 'required'], 
            [['nombre'], 'string', 'max' => 50],
            // Ampliamos para permitir los nuevos campos de identidad
            [['password_hash', 'access_token', 'email', 'foto_perfil', 'password_reset_token'], 'string', 'max' => 255],
            // Validamos que el correo tenga formato real (usuario@dominio.com)
            [['email'], 'email'],
            // Evitamos que dos personas se registren con el mismo usuario o correo
            [['email'], 'unique'],
            [['nombre'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_usuario' => 'Id Usuario',
            'nombre' => 'Nombre',
            'email' => 'Correo Electrónico',
            'password_hash' => 'Contraseña',
            'access_token' => 'Token de Acceso',
            'foto_perfil' => 'Foto de Perfil',
            'password_reset_token' => 'Token de Recuperación',
        ];
    }

    // --- TUS RELACIONES ORIGINALES INTACTAS ---

    public function getComentarios()
    {
        return $this->hasMany(Comentario::class, ['id_usuario' => 'id_usuario']);
    }

    public function getEquipos()
    {
        return $this->hasMany(Equipo::class, ['id_usuario' => 'id_usuario']);
    }

    public function getPerfils()
    {
        return $this->hasMany(Perfil::class, ['id_usuario' => 'id_usuario']);
    }

    public function getProyectos()
    {
        return $this->hasMany(Proyecto::class, ['id_usuario' => 'id_usuario']);
    }

    public function getRegistros()
    {
        return $this->hasMany(Registro::class, ['id_usuario' => 'id_usuario']);
    }

    public function getTareas()
    {
        return $this->hasMany(Tarea::class, ['id_usuario' => 'id_usuario']);
    }

    // --- MÉTODOS DE AUTENTICACIÓN (IDENTITY INTERFACE) ---

    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    public function getId()
    {
        return $this->id_usuario;
    }

    public function getAuthKey()
    {
        return null;
    }

    public function validateAuthKey($authKey)
    {
        return false;
    }

    public static function findByNombre($nombre)
    {
        return static::findOne(['nombre' => $nombre]);
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public function generarAccessToken()
    {
        $this->access_token = Yii::$app->security->generateRandomString(64);
        $this->save(false);
        return $this->access_token;
    }
}