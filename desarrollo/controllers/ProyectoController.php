<?php
namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Proyecto;
use app\models\Equipo; 

class ProyectoController extends ActiveController
{
    public $modelClass = 'app\models\Proyecto';
    
    // Apagamos CSRF
    public $enableCsrfValidation = false; 

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Quitamos la autenticación
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

    // =========================================================
    // PROTOCOLO DE INSERCIÓN MUCHOS A MUCHOS OPTIMIZADO
    // =========================================================

  public function actions()
{
    $actions = parent::actions();
    
    // Desactivamos la creación automática
    unset($actions['create']); 
    
    // ¡ESTA ES LA CLAVE! Desactivamos la actualización automática
    // para que Yii2 use tu función actionUpdate() personalizada
    unset($actions['update']); 
    
    return $actions;
}

    // 2. Función de guardado con carga masiva segura anti-errores 500
    public function actionCreate()
    {
        $request = Yii::$app->request->getBodyParams();

        $proyecto = new Proyecto();
        
        // CARGA SEGURA: Mapea automáticamente los campos que coincidan con la BD (nombre, descripcion, inicio, fin)
        // e ignora los que no existan, evitando excepciones fatales de propiedades desconocidas.
        $proyecto->load($request, ''); 
        
        // Atrapamos el array de usuarios enviado desde Ionic
        $miembrosAsignados = $request['miembros'] ?? [];

        // Iniciamos la transacción para proteger la integridad de la base de datos
        $transaction = Yii::$app->db->beginTransaction();

        try {
            if ($proyecto->save()) {
                
                // INSERCIÓN EN TABLA PIVOTE (equipo)
if (!empty($miembrosAsignados) && is_array($miembrosAsignados)) {
    foreach ($miembrosAsignados as $idUsuario) {
        // VERIFICACIÓN DE SEGURIDAD: ¿Ya existe este vínculo?
        $existe = Equipo::find()
            ->where(['id_proyecto' => $proyecto->id_proyecto, 'id_usuario' => $idUsuario])
            ->exists();
        
        if (!$existe) {
            $vinculo = new Equipo();
            $vinculo->id_proyecto = $proyecto->id_proyecto;
            $vinculo->id_usuario = $idUsuario;
            
            if (!$vinculo->save()) {
                throw new \Exception('Error al asignar usuario ' . $idUsuario);
            }
        }
        // Si ya existe, simplemente lo saltamos y no hacemos nada
    }
}

                $transaction->commit();
                Yii::$app->response->statusCode = 201;
                
                return [
                    'status' => 'success',
                    'mensaje' => 'Proyecto creado y equipo asignado correctamente.',
                    'id_proyecto' => $proyecto->id_proyecto
                ];

            } else {
                // Si el proyecto no pasa las reglas del modelo, mandamos código 400 con sus detalles
                Yii::$app->response->statusCode = 400;
                return [
                    'status' => 'error', 
                    'mensaje' => 'No se pudieron validar los datos del proyecto.', 
                    'errores' => $proyecto->getErrors()
                ];
            }

        } catch (\Exception $e) {
            $transaction->rollBack();
            Yii::$app->response->statusCode = 500;
            return [
                'status' => 'error', 
                'mensaje' => $e->getMessage()
            ];
        }
    }
 public function actionUpdate($id)
{
    // 1. Leer el JSON enviado por Angular
    $rawBody = Yii::$app->request->getRawBody();
    $data = json_decode($rawBody, true);
    
    $proyecto = Proyecto::findOne($id);
    if (!$proyecto) {
        Yii::$app->response->statusCode = 404;
        return ['status' => 'error', 'mensaje' => 'Proyecto no encontrado'];
    }

    // 2. Cargar datos básicos y miembros
    $proyecto->load($data, '');
    $miembros = $data['miembros'] ?? [];

    $transaction = Yii::$app->db->beginTransaction();
    try {
        if ($proyecto->save()) {
            // 3. Sincronización: Borrar viejos e insertar nuevos
            Equipo::deleteAll(['id_proyecto' => $id]);

            if (is_array($miembros)) {
                foreach ($miembros as $idUsuario) {
                    $vinculo = new Equipo();
                    $vinculo->id_proyecto = (int)$id;
                    $vinculo->id_usuario = (int)$idUsuario;
                    $vinculo->rol = 'Editor';
                    
                    if (!$vinculo->save()) {
                        throw new \Exception('Error al guardar integrante ' . $idUsuario);
                    }
                }
            }
            $transaction->commit();
            return ['status' => 'success', 'miembros_guardados' => count($miembros)];
        }
        return ['status' => 'error', 'errores' => $proyecto->getErrors()];
    } catch (\Exception $e) {
        $transaction->rollBack();
        return ['status' => 'error', 'mensaje' => $e->getMessage()];
    }
}
}