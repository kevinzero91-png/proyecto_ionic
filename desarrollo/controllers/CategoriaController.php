<?php
namespace app\controllers;

use yii\rest\ActiveController;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBearerAuth;

class CategoriaController extends ActiveController
{
    public $modelClass = 'app\models\Categoria';
    public $enableCsrfValidation = false;

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // 1. Quitamos el autenticador por defecto
        unset($behaviors['authenticator']);

        // 2. Configuramos CORS
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin'                           => ['http://localhost:8100', 'http://localhost:8101'],
                // ¡AQUÍ ESTÁ EL PRIMER CAMBIO! Agregamos 'OPTIONS'
                'Access-Control-Request-Method'    => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers'   => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age'           => 600
            ]
        ];

        // 3. Volvemos a configurar el autenticador
        $behaviors['authenticator'] = [
            'class' => CompositeAuth::class,
            'authMethods' => [
                HttpBearerAuth::class,
            ],
            // ¡AQUÍ ESTÁ EL SEGUNDO CAMBIO! Exentamos 'options' para que pase sin token
            'except' => ['index', 'view', 'options'] 
        ];

        return $behaviors;
    }
}