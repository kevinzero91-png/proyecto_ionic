<?php
namespace app\controllers;

use yii\rest\ActiveController;

class EquipoController extends ActiveController
{
    public $modelClass = 'app\models\Equipo';
    
    // Apagamos CSRF
    public $enableCsrfValidation = false; 

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Quitamos la autenticación por defecto para no bloquear la lectura
        unset($behaviors['authenticator']);

        // FORZAMOS EL CORS AL PRINCIPIO DE TODO
        $behaviors = array_merge([
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
                'cors' => [
                    'Origin' => ['http://localhost:8100', 'http://127.0.0.1:8100'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Credentials' => true,
                    'Access-Control-Max-Age' => 86400,
                ],
            ],
        ], $behaviors);

        return $behaviors;
    }
}