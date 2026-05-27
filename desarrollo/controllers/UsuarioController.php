<?php
namespace app\controllers;

use yii\rest\ActiveController;

class UsuarioController extends ActiveController
{
    public $modelClass = 'app\models\Usuario';

     public function behaviors()
    {
        $behaviors = parent::behaviors();
        
        // Agregamos los permisos CORS para que Ionic pueda enviar y recibir datos
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:8100'], // El puerto de tu app Ionic
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => null,
                'Access-Control-Max-Age' => 86400,
                'Access-Control-Expose-Headers' => [],
            ],
        ];
        
        return $behaviors;
    }
}