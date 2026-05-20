<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'language' => 'es-Es',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => '7frv84qgaJSqWODk54djFxWbYzDdJ6Ok',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableSession'   => false,
            'loginUrl'        => null
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => \yii\symfonymailer\Mailer::class,
            'viewPath' => '@app/mail',
            // send all mails to a file by default.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
    
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                ['class' => 'yii\rest\UrlRule', 'controller' => 'archivo'],      
                ['class' => 'yii\rest\UrlRule', 'controller' => 'categoria'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'comentario'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'equipo'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'estado'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'etiqueta'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'fase'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'frecuencia'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'nota'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'notificacion'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'pais'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'perfil'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'presupuesto'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'prioridad'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'proyecto'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'registro'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'riesgo'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'sesion'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'subtarea'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'tarea'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'usuario'],
            ],
        ],
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;
