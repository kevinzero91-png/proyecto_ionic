<?php
namespace app\controllers;

use Yii;
use yii\rest\Controller;
use app\models\Usuario;

class AuthController extends Controller
{
    public $enableCsrfValidation = false;

    // --- ESCUDO PERMISIVO CORS (NUEVO) ---
    public function beforeAction($action)
    {
        Yii::$app->response->headers->set('Access-Control-Allow-Origin', '*');
        Yii::$app->response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        Yii::$app->response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');

        // Petición invisible de Ionic (Pre-vuelo)
        if (Yii::$app->request->isOptions) {
            Yii::$app->response->statusCode = 200;
            Yii::$app->end();
        }

        return parent::beforeAction($action);
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['POST', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
            ],
        ];
        return $behaviors;
    }

    // --- ENPOINT DE LOGIN OPTIMIZADO ---
    public function actionLogin()
    {
        $request = Yii::$app->request->getBodyParams();
        $usernameIngresado = $request['username'] ?? null;
        $passwordIngresado = $request['password'] ?? null;

        if (!$usernameIngresado || !$passwordIngresado) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'mensaje' => 'Identificación y clave obligatorias.'];
        }

        $usuario = Usuario::findByNombre($usernameIngresado);

        if ($usuario && $usuario->validatePassword($passwordIngresado)) {
            $token = $usuario->generarAccessToken();
            return [
                'status' => 'success',
                'token' => $token,
                'user' => [
                    'nombre' => $usuario->nombre,
                    'email' => $usuario->email,
                    'foto_perfil' => $usuario->foto_perfil ?? 'default-avatar.png'
                ]
            ];
        }

        Yii::$app->response->statusCode = 401;
        return ['status' => 'error', 'mensaje' => 'Credenciales inválidas. Acceso denegado.'];
    }

    // --- NUEVO ENDPOINT PARA REGISTRAR USUARIOS ---
    public function actionRegister()
    {
        $request = Yii::$app->request->getBodyParams();
        
        $usernameIngresado = $request['username'] ?? null;
        $emailIngresado = $request['email'] ?? null;
        $passwordIngresado = $request['password'] ?? null;

        if (!$usernameIngresado || !$emailIngresado || !$passwordIngresado) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'mensaje' => 'El usuario, correo y contraseña son obligatorios.'];
        }

        if (Usuario::findOne(['nombre' => $usernameIngresado])) {
            Yii::$app->response->statusCode = 409;
            return ['status' => 'error', 'mensaje' => 'Este nombre de usuario ya está en uso.'];
        }
        if (Usuario::findOne(['email' => $emailIngresado])) {
            Yii::$app->response->statusCode = 409;
            return ['status' => 'error', 'mensaje' => 'Este correo electrónico ya está registrado.'];
        }

        $nuevoUsuario = new Usuario();
        $nuevoUsuario->nombre = $usernameIngresado;
        $nuevoUsuario->email = $emailIngresado;
        $nuevoUsuario->password_hash = Yii::$app->security->generatePasswordHash($passwordIngresado);
        $nuevoUsuario->foto_perfil = 'default-avatar.png';

        if ($nuevoUsuario->save()) {
            return [
                'status' => 'success',
                'mensaje' => 'Desarrollador registrado correctamente en el sistema táctico.'
            ];
        } else {
            Yii::$app->response->statusCode = 500;
            return ['status' => 'error', 'errores' => $nuevoUsuario->getErrors()];
        }
    }

    // --- NUEVO ENDPOINT PARA RECUPERAR CONTRASEÑA ---
    public function actionRecover()
    {
        $request = Yii::$app->request->getBodyParams();
        $emailIngresado = $request['email'] ?? null;

        if (!$emailIngresado) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'mensaje' => 'El correo electrónico es obligatorio.'];
        }

        $usuario = Usuario::findOne(['email' => $emailIngresado]);
        
        if (!$usuario) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'mensaje' => 'No hay ninguna credencial asociada a este correo.'];
        }

        $usuario->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
        $usuario->save(false);

        return [
            'status' => 'success',
            'mensaje' => 'Protocolo iniciado. Se han enviado las instrucciones a tu bandeja de entrada.'
        ];
    }

    // --- NUEVO ENDPOINT PARA CAMBIAR LA CONTRASEÑA ---
    public function actionResetPassword()
    {
        $request = Yii::$app->request->getBodyParams();
        $tokenIngresado = $request['token'] ?? null;
        $nuevaPassword = $request['password'] ?? null;

        if (!$tokenIngresado || !$nuevaPassword) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'mensaje' => 'El token y la nueva clave son obligatorios.'];
        }

        $usuario = Usuario::findOne(['password_reset_token' => $tokenIngresado]);
        
        if (!$usuario) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'mensaje' => 'Token de seguridad inválido, incorrecto o ya utilizado.'];
        }

        $usuario->password_hash = Yii::$app->security->generatePasswordHash($nuevaPassword);
        $usuario->password_reset_token = null;

        if ($usuario->save(false)) { 
            return ['status' => 'success', 'mensaje' => 'La clave de acceso ha sido reconfigurada con éxito.'];
        } else {
            Yii::$app->response->statusCode = 500;
            return ['status' => 'error', 'mensaje' => 'Error interno al guardar la nueva credencial.'];
        }
    }

    // --- NUEVO ENDPOINT: ACTUALIZAR PERFIL (EL QUE FALTABA) ---
    public function actionUpdateProfile()
    {
        $request = Yii::$app->request->getBodyParams();
        
        $emailActual = $request['email_actual'] ?? null;
        $nuevoNombre = $request['nombre'] ?? null;
        $nuevoEmail = $request['email'] ?? null;

        if (!$emailActual || !$nuevoNombre || !$nuevoEmail) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'mensaje' => 'Datos incompletos para la actualización.'];
        }

        $usuario = Usuario::findOne(['email' => $emailActual]);
        
        if (!$usuario) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'mensaje' => 'Usuario no encontrado.'];
        }

        $usuario->nombre = $nuevoNombre;
        $usuario->email = $nuevoEmail;

        if ($usuario->save()) {
            return [
                'status' => 'success',
                'mensaje' => 'Perfil actualizado correctamente.',
                'user' => [
                    'nombre' => $usuario->nombre,
                    'email' => $usuario->email,
                    'foto_perfil' => $usuario->foto_perfil
                ]
            ];
        } else {
            Yii::$app->response->statusCode = 500;
            return ['status' => 'error', 'errores' => $usuario->getErrors()];
        }
    }

    // --- ENDPOINT OPTIMIZADO: SUBIDA FÍSICA DIRECTA ---
    public function actionUploadAvatar()
    {
        $emailActual = Yii::$app->request->post('email_actual');
        $archivoFisico = \yii\web\UploadedFile::getInstanceByName('foto');

        if (!$emailActual || !$archivoFisico) {
            Yii::$app->response->statusCode = 400;
            return ['status' => 'error', 'mensaje' => 'No se recibió la imagen o el identificador del desarrollador.'];
        }

        $usuario = Usuario::findOne(['email' => $emailActual]);
        if (!$usuario) {
            Yii::$app->response->statusCode = 404;
            return ['status' => 'error', 'mensaje' => 'Usuario no encontrado.'];
        }

        $carpeta = Yii::getAlias('@webroot') . '/uploads/avatars/';
        if (!is_dir($carpeta)) {
            mkdir($carpeta, 0777, true);
        }

        $nombreArchivo = 'avatar_' . $usuario->id_usuario . '_' . time() . '.' . $archivoFisico->extension;
        $rutaCompleta = $carpeta . $nombreArchivo;

        if ($archivoFisico->saveAs($rutaCompleta)) {
            $usuario->foto_perfil = $nombreArchivo;
            $usuario->save(false);

            return [
                'status' => 'success',
                'mensaje' => 'Archivo subido correctamente.',
                'foto_perfil' => $nombreArchivo,
                'url' => Yii::$app->request->hostInfo . Yii::$app->request->baseUrl . '/uploads/avatars/' . $nombreArchivo
            ];
        }

        Yii::$app->response->statusCode = 500;
        return ['status' => 'error', 'mensaje' => 'El servidor no pudo guardar el archivo físicamente.'];
    }
}