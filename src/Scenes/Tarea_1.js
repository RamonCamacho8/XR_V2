import React from "react";
import * as BABYLON from "babylonjs";
import SceneComponent from "../Babylon_components/SceneComponent"; 
import * as earcut from "earcut";


const onSceneReady = (e) => {

  const { canvas, scene, engine } = e;
  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  const axes3D = new BABYLON.AxesViewer(scene,2)

  const localAxes = new BABYLON.AxesViewer(scene, 1);

  // This attaches the camera to the canvas
  camera.attachControl(canvas, false);

  camera.useAutoRotationBehavior = true;
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  

  // Default intensity is 1. Let's dim the light a small amount
 


  const bladeShape = [
    new BABYLON.Vector3(0.00  , 0.00,   0.00), //1
    new BABYLON.Vector3(8.00  , 0.00,   4.60), //2
    new BABYLON.Vector3(8.00  , 0.00,   9.80), //3
    new BABYLON.Vector3(3.45  , 0.00,   7.20), //4 
    new BABYLON.Vector3(3.45  , 0.00,   8.35), //5
    new BABYLON.Vector3(4.92  , 0.00,   9.20),   //6
    new BABYLON.Vector3(4.92  , 0.00,  10.80), //7
    new BABYLON.Vector3(5.60  , 0.00,  11.20), //8
    new BABYLON.Vector3(5.60  , 0.00,  23.04), //9
    new BABYLON.Vector3(6.64  , 0.00,  23.65), //10
    new BABYLON.Vector3(6.64  , 0.00,  25.58), //11
    new BABYLON.Vector3(5.60  , 0.00,  24.98),
    new BABYLON.Vector3(5.60  , 0.00,  25.77),
    new BABYLON.Vector3(8.00  , 0.00,  27.16),
    new BABYLON.Vector3(8.00  , 0.00,  30.27),
    new BABYLON.Vector3(0.57  , 0.00,  26.00),
    new BABYLON.Vector3(0.57  , 0.00,  11.92),
    new BABYLON.Vector3(0.00  , 0.00,  11.60) 
  ];
  bladeShape.push(bladeShape[0]);  //close profile

  const wandPart1_shape = [
    new BABYLON.Vector3(0.00  , 0.00,   0.00), //1
    new BABYLON.Vector3(1.90  , 0.00,   1.10), //2
    new BABYLON.Vector3(1.90  , 0.00,  13.23), //3
    new BABYLON.Vector3(-0.55  , 0.00,  14.25),  //4
    new BABYLON.Vector3(-1.00  , 0.00,  12.52),  //5
    new BABYLON.Vector3(-1.9  , 0.00,  13.50),  //6
    new BABYLON.Vector3(-3.21  , 0.00,  12.72),  //7
    new BABYLON.Vector3(-1.88  , 0.00,  10.80),  //8
    new BABYLON.Vector3(0.00  , 0.00,   10) //9
  ];
  wandPart1_shape.push(wandPart1_shape[0]);  //close profile

  const wandPart2_shape = [
    new BABYLON.Vector3(0.00  , 0.00,   0.00), //1
    new BABYLON.Vector3(2.05  , 0.00,   3.05), //2
    new BABYLON.Vector3(1.56  , 0.00,  3.88), //3
    new BABYLON.Vector3(0.00  , 0.00,  3.12),  //4
    new BABYLON.Vector3(-0.26  , 0.00,  4.50),  //5
    new BABYLON.Vector3(0.00  , 0.00,  5.84),  //6
    new BABYLON.Vector3(1.02  , 0.00,  6.86),  //7
    new BABYLON.Vector3(0.46  , 0.00,   9.23), //8
    new BABYLON.Vector3(-1.20  , 0.00,  8.05), //9
    new BABYLON.Vector3(-2.05  , 0.00,  6.56), //10
    new BABYLON.Vector3(-2.54  , 0.00,  4.70), //11
    new BABYLON.Vector3(-2.05  , 0.00,  2.04), //12
    new BABYLON.Vector3(-1.20  , 0.00,  1.15), //13

  ];
  wandPart2_shape.push(wandPart2_shape[0]);  //close profile


  const wandPart3_shape = [
		    new BABYLON.Vector3(2, 0, 0),
        new BABYLON.Vector3(4, 0, 0),
        new BABYLON.Vector3(4, 1.1, 0),
        new BABYLON.Vector3(2, 1.1, 0)
	];
  wandPart3_shape.push(wandPart3_shape[0]);  //close profile

  const wandPart4_shape = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(1.35, 0, 0),
        new BABYLON.Vector3(1.35, 1.279, 0),
        new BABYLON.Vector3(0.85, 1.70, 0),
        new BABYLON.Vector3(0.85, 15.132, 0),
        new BABYLON.Vector3(1.35, 17.285, 0),
        new BABYLON.Vector3(0.00, 17.285, 0)
  ];

  wandPart4_shape.push(wandPart4_shape[0]);  //close profile


  const blade = BABYLON.MeshBuilder.ExtrudePolygon("blade", {shape:bladeShape, depth: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene,earcut);
  const wandPart1 = BABYLON.MeshBuilder.ExtrudePolygon("wandPart1", {shape:wandPart1_shape, depth: 1.4, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene,earcut);
  const wandPart2 = BABYLON.MeshBuilder.ExtrudePolygon("wandPart2", {shape:wandPart2_shape, depth: 1.6, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene,earcut);
  const wandPart3 = BABYLON.MeshBuilder.CreateLathe("wandPart3", {shape: wandPart3_shape, radius: 1, tessellation:12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
  const wandPart4 = BABYLON.MeshBuilder.CreateLathe("wandPart4", {shape: wandPart4_shape, radius: 0, tessellation:12, sideOrientation: BABYLON.Mesh.DOUBLESIDE});


  const wandMaterial = new BABYLON.StandardMaterial("material", scene);
  const bladeMaterial = new BABYLON.StandardMaterial("material", scene);
  wandMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  bladeMaterial.diffuseColor = new BABYLON.Color3(0, .8, 0);
  bladeMaterial.emissiveColor = new BABYLON.Color3(0, 1, 0);
  blade.material = bladeMaterial;


  wandPart3.convertToFlatShadedMesh();
  wandPart4.convertToFlatShadedMesh();
  
  localAxes.xAxis.parent = wandPart4;
  localAxes.yAxis.parent = wandPart4;
  localAxes.zAxis.parent = wandPart4;	
  

  wandPart1.material = wandMaterial;
  wandPart2.material = wandMaterial;
  wandPart3.material = wandMaterial;
  wandPart4.material = wandMaterial;

  wandPart1.position.y = .2;
  wandPart1.position.z = 12.7;

  wandPart2.position.y = .3;
  wandPart2.position.z = 25.105;
  wandPart2.position.x = -0.30;  

  wandPart3.position.y = -1.05;
  wandPart3.position.z = 29.2;
  wandPart3.position.x = 2.4;
  
  wandPart4.rotation.x = Math.PI/2;
  wandPart4.position.y = -1.35/2;
  wandPart4.position.z = 32;
  wandPart4.position.x = 2.4;



  

  var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
  ground.position.y = -3;

  scene.onBeforeRenderObservable.add(() =>{
    if (wandPart4 !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
      const rpm = 1
      wandPart4.rotation.z   += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000); 
      blade.rotation.z   += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);

    } 

  });
};



function Test() {
  return (
      <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Test;
