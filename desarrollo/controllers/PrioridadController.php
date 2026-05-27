<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\filters\Cors; // <-- 1. Es VITAL importar esta clase aquí arriba

class PrioridadController extends ActiveController
{
    public $modelClass = 'app\models\Prioridad';

    // 2. Agregamos la función behaviors() para configurar los permisos
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Configuración de CORS
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                // Permite peticiones desde cualquier origen (ideal para desarrollo con Ionic)
                'Origin' => ['*'], 
                // Permite todos los métodos comunes
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                // Permite todas las cabeceras
                'Access-Control-Request-Headers' => ['*'],
            ],
        ];

        return $behaviors;
    }
}